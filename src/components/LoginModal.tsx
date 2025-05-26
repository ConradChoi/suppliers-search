import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Link,
  Typography
} from '@mui/material';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 처리 로직
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>로그인</DialogTitle>
      <form onSubmit={handleLogin}>
        <DialogContent>
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
            <Link href="#" underline="hover" sx={{ fontSize: 14 }}>
              비밀번호 초기화
            </Link>
          </Box>
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', alignItems: 'stretch', px: 3, pb: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>
            로그인
          </Button>
          <Typography variant="body2" align="center">
            계정이 없으신가요?{' '}
            <Link href="#" underline="hover">
              가입하기
            </Link>
          </Typography>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoginModal; 