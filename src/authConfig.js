// src/authConfig.js
export const msalConfig = {
    auth: {
      clientId: "18b7d46f-1fa2-4415-851d-dfa6ad7284ce", // Substitua pelo ID do Cliente (App ID) do Azure AD
      authority: "https://login.microsoftonline.com/245c550b-85da-468e-812b-0fe900e4abaf", // URL do locatário
      redirectUri: "http://localhost:5003" // URL de redirecionamento
    }
  };
  
  export const loginRequest = {
    scopes: ["User.Read"] // Escopos para a API Microsoft Graph
  };  