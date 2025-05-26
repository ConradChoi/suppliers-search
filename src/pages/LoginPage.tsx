import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Link, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 처리 로직
  };

  return (
    <Container maxWidth="xs" sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 700, mb: 3 }}>
          로그인
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="이메일"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            label="비밀번호"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Box sx={{ mt: 1, mb: 2, textAlign: 'right' }}>
            <Link href="#" underline="hover" sx={{ fontSize: 14 }} onClick={e => { e.preventDefault(); navigate('/reset-password'); }}>
              비밀번호 초기화
            </Link>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
            로그인
          </Button>
        </form>
        <Typography variant="body2" align="center">
          계정이 없으신가요?{' '}
          <Link href="#" underline="hover" onClick={e => { e.preventDefault(); navigate('/join'); }}>
            가입하기
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage; 