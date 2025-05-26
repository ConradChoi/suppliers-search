import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerified(true);
      setVerifying(false);
    }, 1000); // 임의 인증 처리
  };

  const canChange = email && name && verified && password.length >= 6;

  return (
    <Container maxWidth="xs" sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 700, mb: 3 }}>
          비밀번호 재설정
        </Typography>
        <form onSubmit={e => { e.preventDefault(); setTouched(true); if (canChange) {/* 비밀번호 변경 처리 */} }}>
          <TextField
            label="이메일"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <TextField
            label="성명"
            type="text"
            fullWidth
            margin="normal"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoComplete="name"
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, mb: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleVerify}
              disabled={verifying || !email || !name || verified}
              sx={{ minWidth: 120 }}
            >
              {verified ? '인증 완료' : verifying ? '인증 중...' : '메일 인증'}
            </Button>
            {verified && <Typography color="success.main">메일 인증 완료</Typography>}
          </Box>
          <TextField
            label="새로운 비밀번호"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            inputProps={{ minLength: 6 }}
            disabled={!verified}
            error={touched && password.length > 0 && password.length < 6}
            helperText={touched && password.length > 0 && password.length < 6 ? '비밀번호는 6자 이상 입력하세요.' : ''}
          />
          {touched && !canChange && (
            <Alert severity="warning" sx={{ mt: 2, mb: 0 }}>
              모든 항목을 올바르게 입력하고 메일 인증을 완료해 주세요.
            </Alert>
          )}
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button variant="outlined" color="inherit" fullWidth onClick={() => navigate(-1)}>
              취소하기
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={!canChange}>
              변경하기
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage; 