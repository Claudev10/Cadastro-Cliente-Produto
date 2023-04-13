import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";

const LoginPage = () => {
    const navigate = useNavigate('');

    const handleSignupClick = () => {
        navigate('/signup')
    }

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"                
    >
      <Box width="400px" p="4" border="1px solid black" borderRadius="1rem" boxShadow="xl" >
        <Heading mb="4" textAlign="center">Login</Heading>
        <FormControl mb="4">
          <FormLabel>Usuário</FormLabel>
          <Input type="text" placeholder="Digite seu usuário" />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Senha</FormLabel>
          <Input type="password" placeholder="Digite sua senha" />
        </FormControl>
        <Stack direction="row" justifyContent="center" mb="4">
          <Button colorScheme="blue">Entrar</Button>
          <Button colorScheme="gray" onClick={handleSignupClick}>Cadastrar</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginPage;
