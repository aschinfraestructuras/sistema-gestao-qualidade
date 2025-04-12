// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <App />
      </LocalizationProvider>
    </HashRouter>
  </React.StrictMode>
);
