import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Button,
  Flex,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import Modal from "./Modal";

const MainPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [produtoSelecionado, setProdutoSelecionado] = useState(null); 
  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/produtos/${id}`);
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  const handleAddProduto = () => {
    setIsModalOpen(true); 
  };

  const handleModalClose = () => {
    setIsModalOpen(false); 
  };

  const handleProdutoConfirm = async (produto) => {
    try {
      await axios.post("http://localhost:5000/produtos", produto);
      fetchProdutos();
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  const handleProdutoEdit = async (produto) => {
    try {
      await axios.put(`http://localhost:5000/produtos/${produto.id}`, produto); // Fazer a requisição de edição do produto
      await fetchProdutos(); // Atualizar a lista de produtos após a edição
      setIsModalOpen(false); // Fechar o modal de edição
      setProdutoSelecionado(null); // Limpar o produto selecionado
    } catch (error) {
      console.error("Erro ao editar produto:", error);
    }
  };

  return (
    <Box p="4">
      <Heading as="h1" size="xl" mb="4">
        Produtos
      </Heading>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="teal"
        mb="4"
        onClick={handleAddProduto}
      >
        Adicionar Produto
      </Button>
      <VStack align="stretch" spacing="4">
        {produtos.map((produto) => (
          <Box key={produto.id} borderWidth="1px" borderRadius="md" p="4" width="100%">
            <Flex align="center">
              <Heading as="h2" size="md" flexGrow="1">
                {produto.nome}
              </Heading>
              <Tooltip label="Editar" placement="top">
                <IconButton
                  icon={<EditIcon />}
                  aria-label="Editar"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setProdutoSelecionado(produto); // Setar o produto selecionado
                    setIsModalOpen(true); // Abrir o modal de edição
                  }}
                />
                </Tooltip>
              <Tooltip label="Apagar" placement="top">
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="Apagar"
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(produto.id)}
                />
              </Tooltip>
            </Flex>
            <Text fontSize="sm" mt="2">
              <strong>Código:</strong> {produto.codigo}
            </Text>
            <Text fontSize="sm">
              <strong>Tipo:</strong> {produto.tipo}
            </Text>
            <Text fontSize="sm">
              <strong>Descrição:</strong> {produto.descricao}
            </Text>
          </Box>
        ))}
      </VStack>      
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={produtoSelecionado ? handleProdutoEdit : handleProdutoConfirm} 
          produto={produtoSelecionado} 
          />
      )}
    </Box>
  );
};

export default MainPage;
