import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import MainPage from "./Pages/MainPage";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
