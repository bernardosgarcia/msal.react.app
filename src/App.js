// src/App.js
import React, { useEffect, useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "./authConfig";
import { jwtDecode } from "jwt-decode";

// Cria a instância do MSAL
const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  const [account, setAccount] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Inicializa o MSAL
    const initializeMsal = async () => {
      await msalInstance.initialize();
      setIsInitialized(true);
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        acquireTokenSilently(accounts[0]);
      }
    };
    initializeMsal();
  }, []);

  // Função para obter o token silenciosamente (sem interação)
  const acquireTokenSilently = async (account) => {
    try {
      const response = await msalInstance.acquireTokenSilent({
        account,
        ...loginRequest
      });
      setAccessToken(response.accessToken);
      console.log("Token adquirido silenciosamente:", response.accessToken);
    } catch (error) {
      console.error("Erro ao obter token silenciosamente:", error);
    }
  };

  // Função de login com MSAL
  const handleLogin = async () => {
    if (!isInitialized) {
      console.error("MSAL não está inicializado");
      return;
    }
    try {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      setAccount(loginResponse.account);
      acquireTokenSilently(loginResponse.account);
    } catch (error) {
      console.error("Erro ao efetuar login:", error);
    }
  };

  // Função auxiliar para verificar a validade do token
  const isTokenValid = (token) => {
    if (!token) return false;
    const decodedToken = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return decodedToken.exp > now;
  };

  // Função de logout
  const handleLogout = () => {
    msalInstance.logoutPopup();
    setAccount(null);
    setAccessToken(null);
  };

  return (
    <div className="App">
      <h1>MSAL Authentication Example</h1>
      {!account ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <>
          <p>Bem-vindo, {account.username}</p>
          {accessToken ? (
            <>
              <p>Token: {isTokenValid(accessToken) ? "Válido" : "Expirado"}</p>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <p>Obtendo token...</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;