import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';
const theme = createTheme();

createRoot(document.getElementById('root')).render(
  
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
 
);
