import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Box } from '@mui/material';
import styles from './cadastro.module.css';


const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cep, setCep] = useState('');
  const [cnpj, setCnpj] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/cadastro', { nome, email, senha, cep, cnpj });
      navigate('/');
    } catch (error) {
      console.error('Falha no cadastro', error);
    }
  };

  return (


    <Box className={styles.container}>
    
    <div className={styles.div_bemvindo}>
       <h1 >Bem-vindo</h1>
          <p>Faça seu cadastro para utilizar nosso sistema</p>
       </div>
      

       <div className={styles.dados}>
        <h1>Cadastro</h1>
        
        <p>Já tem conta? <a href="/"> Entre Aqui</a></p>
       
     
        
        
        <Box component="form" onSubmit={handleSubmit} className={styles.form}>
        
          <input
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Nome"
            name="nome"
            autoComplete="name"
            placeholder='Nome'
            autoFocus
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={styles.input2}
          />
          <input
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input2}
          />
          


          <div className={styles.dados2}>

          
          <input
            margin="normal"
            required
            fullWidth
            id="cep"
            label="CEP"
            name="cep"
            placeholder='Cep'
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className={styles.input}
          />
          <input
            margin="normal"
            required
            fullWidth
            id="cnpj"
            label="CNPJ"
            name="cnpj"
            placeholder='Cnpj'
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            className={styles.input}
          /> <input
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="new-password"
            placeholder='Senha'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.input}
          />
          <input
            margin="normal"
            required
            fullWidth
            name="confirmarSenha"
            label="Confirmar Senha"
            type="password"
            id="confirmarSenha"
            autoComplete="new-password"
            placeholder='Confirmar senha'
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className={styles.input}
          />

</div>

           <Button
           type="submit"

           variant="contained"
           sx={{
           width: '350px', backgroundColor: '#1BC3A7',  border: '1px solid #1BC3A7',borderRadius: '4px',boxShadow: 'rgba(0, 0, 0, 0.1) 0 2px 4px 0',color: '#fff',cursor: 'pointer',fontFamily: '"Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif',fontSize: '16px',fontWeight: '400',padding: '25px 50px',textAlign: 'center',transition: 'transform 150ms, box-shadow 150ms','&:hover': {  boxShadow: 'rgba(0, 0, 0, 0.15) 0 3px 9px 0',  transform: 'translateY(-2px)',},'&:active': {  transform: 'translateY(2px)',  boxShadow: 'rgba(0, 0, 0, 0.1) 0 1px 2px 0',},'@media (min-width: 768px)': {  padding: '10px 30px',}}}
        >
            Cadastrar
          </Button>
        </Box>
        </div>
    </Box>
  );
};

export default Cadastro;

//top: 3062px;
//left: 584px;
//gap: 0px;
//border-radius: '15px 0px 0px 0px';
//opacity: 0px;//
