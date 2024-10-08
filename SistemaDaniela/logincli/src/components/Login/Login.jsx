import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Box } from '@mui/material';
import styles from './login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, senha });
      localStorage.setItem('token', response.data.token);
      navigate('/painel');
    } catch (error) {
      console.error('Falha no login', error);
    }
  };

  return (

    <Box className={styles.container}>
   
       
       <div className={styles.div_bemvindo}>
       <h1>Bem-vindo</h1>
          <p>Faça seu login para prosseguir</p>
          <img src="/src/assets/pc_img_login.png" alt="" />
       </div>


        <div className={styles.dados}>

  
          <p>Ainda não tem login? <a href="/Cadastro"> Cadastro</a>
          
          </p>
          
          <h1>Login</h1>
        
        
        <Box component="form" onSubmit={handleSubmit} className={styles.form}>
          <input
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            placeholder='Email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="current-password"
            placeholder='Senha'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.input}
          />
            <Button
              type="submit"
            
              variant="contained"
              sx={{
                backgroundColor: '#1BC3A7',  border: '1px solid #1BC3A7',borderRadius: '4px',boxShadow: 'rgba(0, 0, 0, 0.1) 0 2px 4px 0',color: '#fff',cursor: 'pointer',fontFamily: '"Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif',fontSize: '16px',fontWeight: '400',padding: '25px 50px',textAlign: 'center',transition: 'transform 150ms, box-shadow 150ms','&:hover': {  boxShadow: 'rgba(0, 0, 0, 0.15) 0 3px 9px 0',  transform: 'translateY(-2px)',},'&:active': {  transform: 'translateY(2px)',  boxShadow: 'rgba(0, 0, 0, 0.1) 0 1px 2px 0',},'@media (min-width: 768px)': {  padding: '10px 30px',}}}
            >
            Entrar
          </Button>
          
        </Box>
      </div>
    
    </Box>

  ); 



};

export default Login;