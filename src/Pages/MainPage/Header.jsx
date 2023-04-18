import React, { useState } from "react";
import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

const ProductHeader = ({ handleLogout }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogoutClick = () => {
    setIsLoading(true);
    handleLogout();
  };

  return (
    <Flex justify="space-between" alignItems="center" mb="4">
      <Heading as="h1" size="xl">
        Produtos
      </Heading>
      <IconButton
        icon={<CloseIcon />}
        aria-label="Logout"
        size="sm"
        variant="ghost"
        isLoading={isLoading}
        onClick={handleLogoutClick}
      />
    </Flex>
  );
};

ProductHeader.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default ProductHeader;
