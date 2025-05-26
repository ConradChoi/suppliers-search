import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import About from './pages/About';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SuppliersPage from './pages/SuppliersPage';
import Top100Page from './pages/Top100Page';
import BoardPage from './pages/BoardPage';
import BoardWritePage from './pages/BoardWritePage';
import BoardDetailPage from './pages/BoardDetailPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/top100" element={<Top100Page />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/board/write" element={<BoardWritePage />} />
          <Route path="/board/:id" element={<BoardDetailPage />} />
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App; 