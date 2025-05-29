import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // 관리자 계정 정보 확인 (by pass)
    if (email === 'jhc@ylia.io' && password === 'new1234!') {
      try {
        // 로그인 성공 시 대시보드로 이동
        await navigate('/admin/dashboard', { replace: true });
      } catch (error) {
        console.error('Navigation error:', error);
        setError('페이지 이동 중 오류가 발생했습니다.');
      }
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 700 }}>
          관리자 로그인
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="이메일"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <TextField
            label="비밀번호"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            로그인
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLoginPage; 