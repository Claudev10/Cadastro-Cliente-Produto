import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";

const SignupPage = () => {
    const navigate = useNavigate('');

    const handleBackClick = () => {
        navigate('/')
    }

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
          <Input type="text" placeholder="Digite seu usuário" />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Digite seu email" />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Senha</FormLabel>
          <Input type="password" placeholder="Digite sua senha" />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Confirmar Senha</FormLabel>
          <Input type="password" placeholder="Confirme sua senha" />
        </FormControl>
        <Stack direction="row" justifyContent="center" mb="4">
          <Button colorScheme="blue">Cadastrar</Button>
          <Button colorScheme="gray" onClick={handleBackClick}>Voltar</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignupPage;
