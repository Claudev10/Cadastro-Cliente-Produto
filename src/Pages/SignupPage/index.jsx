import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";

const SignupPage = () => {
    const navigate = useNavigate('');
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erroCadastro, setErroCadastro] = useState(false); 
    const [mensagemErroCadastro, setMensagemErroCadastro] = useState(""); 
    const [errorMessage, setErrorMessage] = useState("");

    const baseURL = "http://localhost:5000/users"

    const toast = useToast(); 

    const handleBackClick = () => {
        navigate('/')
    }

    const validarEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    const handleCadastroClick = async () => { 
      if (!usuario || !email || !senha || !confirmarSenha) {
        setErrorMessage("Preencha todos os campos.");
        return;
      }

      if (!validarEmail(email)) {
        setErrorMessage("Digite um email válido.");
        return;
      }
  
      if (senha !== confirmarSenha) {
        setErrorMessage("As senhas não coincidem. Tente novamente.");
        return;
      } 
     
    const usuarioData = {
      usuario: usuario,
      email: email,
      senha: senha,   
    };
    
    try {
      const response = await axios.get(`${baseURL}?email=${email}`); 
      if (response.data.length > 0) {        
        setErroCadastro(true);
        setMensagemErroCadastro("O email informado já está cadastrado.");
        return;
      }
      
      await axios.post(baseURL, usuarioData);      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Seu cadastro foi concluído com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
        variant: "subtle",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      });
      navigate('/'); 
    } catch (error) {
      console.error("Erro ao cadastrar:", error);      
      setErroCadastro(true);
      setMensagemErroCadastro("Ocorreu um erro ao cadastrar. Por favor, tente novamente.");
    }
  };
  
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="400px" p="4" border="1px solid black" borderRadius="1rem" boxShadow="xl">
        <Box mb="4" textAlign="center">
          <Heading>Novo Cadastro</Heading>
        </Box>
        <FormControl mb="4">
          <FormLabel>Usuário</FormLabel>
          <Input
              type="text"
              placeholder="Digite seu usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
          />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Confirmar Senha</FormLabel>
            <Input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </FormControl>
          {erroCadastro && ( 
            <Box mb="4" color="red" fontWeight="bold">
              {mensagemErroCadastro}
            </Box>
          )}
          {errorMessage && (
            <Box mb="4" color="red">
                {errorMessage}
            </Box>
        )}         
        <Stack direction="row" justifyContent="center" mb="4">
          <Button colorScheme="blue" onClick={handleCadastroClick}>Cadastrar</Button>
          <Button colorScheme="gray" onClick={handleBackClick}>Voltar</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignupPage;
