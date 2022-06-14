import React from 'react';

import { NavBar } from './components/NavBar';
import { TransactionList } from './components/TransactionList';
import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF7661',
      contrastText: '#fff',
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="layout">
        <NavBar />
        <main style={{ width: '100%' }}>
          <TransactionList />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
