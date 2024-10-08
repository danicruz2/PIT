const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Usuario = sequelize.define('Usuario', {
  nome: Sequelize.STRING,
  email: Sequelize.STRING,
  senha: Sequelize.STRING,
  cep: Sequelize.STRING,
  cnpj: Sequelize.STRING
});

sequelize.sync();

app.post('/api/cadastro', async (req, res) => {
  try {
    const { nome, email, senha, cep, cnpj } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);
    await Usuario.create({ nome, email, senha: senhaHash, cep, cnpj });
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Falha no cadastro' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (usuario && await bcrypt.compare(senha, usuario.senha)) {
      const token = jwt.sign({ usuarioId: usuario.id }, 'seu_segredo_jwt');
      res.json({ token });
    } else {
      res.status(401).json({ erro: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ erro: 'Falha no login' });
  }
});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post('/auth/google', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const { name, email } = ticket.getPayload();
  let usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    usuario = await Usuario.create({ nome: name, email, senha: 'auth_google' });
  }
  const jwtToken = jwt.sign({ usuarioId: usuario.id }, 'seu_segredo_jwt');
  res.json({ token: jwtToken });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));