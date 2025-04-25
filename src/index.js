import React from 'react';
import ReactDOM from 'react-dom';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import App from './App';

const msalConfig = {
  auth: {
    clientId: '18b7d46f-1fa2-4415-851d-dfa6ad7284ce',
    authority: `https://login.microsoftonline.com/245c550b-85da-468e-812b-0fe900e4abaf`,
    redirectUri: 'http://localhost:5003'
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>,
  document.getElementById('root')
);
