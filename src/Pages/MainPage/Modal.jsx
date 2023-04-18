import React, { useState, useEffect } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from "@chakra-ui/react";

const Modal = ({ isOpen, onClose, onConfirm, produto }) => {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nomeError, setNomeError] = useState("");
  const [codigoError, setCodigoError] = useState("");
 
  useEffect(() => {
    if (produto !== null) {      
      setNome(produto.nome || "");
      setCodigo(produto.codigo || "");
      setTipo(produto.tipo || "");
      setDescricao(produto.descricao || "");
    }
  }, [produto]);

  const handleConfirm = () => {    
    if (!nome) {
      setNomeError("Campo obrigatório");
      return;
    }
    if (!codigo) {
      setCodigoError("Campo obrigatório");
      return;
    }
    onConfirm({ nome, codigo, tipo, descricao });    
  };

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar Produto</ModalHeader>
        <ModalBody>
          <FormControl mb="4" isInvalid={!!nomeError}>
            <FormLabel>Nome do Produto</FormLabel>
            <Input
              placeholder="Nome do produto"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                setNomeError("");
              }}
            />
            <FormErrorMessage>{nomeError}</FormErrorMessage>
          </FormControl>
          <FormControl mb="4" isInvalid={!!codigoError}>
            <FormLabel>Código do Produto</FormLabel>
            <Input
              placeholder="Código do produto"
              value={codigo}
              onChange={(e) => {
                setCodigo(e.target.value);
                setCodigoError("");
              }}
            />
            <FormErrorMessage>{codigoError}</FormErrorMessage>
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Tipo do Produto</FormLabel>
            <Input
              placeholder="Tipo do produto"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Descrição do Produto</FormLabel>
            <Input
              placeholder="Descrição do produto"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}              
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleConfirm}>
            Confirmar Produto
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Voltar
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
