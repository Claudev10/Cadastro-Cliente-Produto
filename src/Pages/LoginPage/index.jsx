import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, useToast } from "@chakra-ui/react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

  const baseURL = "http://localhost:5000/users";

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const toast = useToast();

  const handleMainClick = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(baseURL);
      const users = await response.json();
      const user = users.find(
        (user) => user.usuario === username && user.senha === password
      );
      if (user) {
        navigate("/main");
        toast({
          title: "Sucesso",
          description: "Login realizado com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
          variant: "subtle",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"          
        });                 
      } else {
        setErrorMessage("Usuário ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao autenticar usuário", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="400px"
        p="4"
        border="1px solid black"
        borderRadius="1rem"
        boxShadow="xl"
      >
        <Heading mb="4" textAlign="center">
          Login
        </Heading>
        <FormControl mb="4">
          <FormLabel>Usuário</FormLabel>
          <Input
            type="text"
            placeholder="Digite seu usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        {errorMessage && (
          <div
            style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}
          >
            {errorMessage}
          </div>
        )}
        <Stack direction="row" justifyContent="center" mb="4">
          <Button colorScheme="blue" onClick={handleMainClick} isLoading={isLoading}>
            Entrar
          </Button>
          <Button colorScheme="gray" onClick={handleSignupClick}>
            Cadastrar
          </Button>
        </Stack>
      </Box>      
    </Box>
  );
};

export default LoginPage;
