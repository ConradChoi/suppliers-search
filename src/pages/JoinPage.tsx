import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
  CircularProgress,
  Alert,
  Collapse,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';
import TermsModal from '../components/TermsModal';

const fakeEmailCheck = (email: string) => {
  // 임의 중복 체크: test@test.com만 중복, 나머지는 사용 가능
  return new Promise<{ exists: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ exists: email === 'test@test.com' });
    }, 700);
  });
};

const TERMS = {
  terms1: {
    title: '이용약관 동의',
    content: '여기에 이용약관 전문이 들어갑니다. (예시) ...'
  },
  terms2: {
    title: '개인정보 수집 및 이용 동의',
    content: `Suppliers Search는 아래와 같이 개인정보를 수집 및 이용합니다.\n1. 개인정보 수집 목적 : 본인확인, 마케팅 활용\n2. 개인정보 수집 항목 : 이메일, 비밀번호, 성명\n3. 보유기간 : 회원탈퇴 시 까지`
  }
};

const JoinPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState<'idle' | 'checking' | 'exists' | 'ok'>('idle');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [terms1, setTerms1] = useState(false);
  const [terms2, setTerms2] = useState(false);
  const [allTerms, setAllTerms] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState<null | 'terms1' | 'terms2'>(null);
  const [touched, setTouched] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const navigate = useNavigate();

  // 이메일 입력 시 자동 중복 체크
  React.useEffect(() => {
    if (!email) {
      setEmailCheck('idle');
      return;
    }
    setEmailCheck('checking');
    const timeout = setTimeout(() => {
      fakeEmailCheck(email).then((res) => {
        setEmailCheck(res.exists ? 'exists' : 'ok');
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [email]);

  // 전체동의 체크박스 동기화
  React.useEffect(() => {
    // 전체동의 체크 시 개별동의 모두 체크
    if (allTerms) {
      setTerms1(true);
      setTerms2(true);
    }
    // 전체동의 해제 시 개별동의 모두 해제
    else {
      setTerms1(false);
      setTerms2(false);
    }
    // eslint-disable-next-line
  }, [allTerms]);

  // 개별동의 체크 시 전체동의 상태 동기화
  React.useEffect(() => {
    if (terms1 && terms2) {
      setAllTerms(true);
    } else {
      setAllTerms(false);
    }
    // eslint-disable-next-line
  }, [terms1, terms2]);

  const canJoin =
    email &&
    emailCheck === 'ok' &&
    password.length >= 6 &&
    name &&
    terms1 &&
    terms2;

  return (
    <Container maxWidth="xs" sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 700, mb: 3 }}>
          회원가입
        </Typography>
        <form onSubmit={e => { e.preventDefault(); setTouched(true); if (canJoin) {/* 회원가입 처리 */} }}>
          <TextField
            label="이메일"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
            onBlur={() => setTouched(true)}
            InputProps={{
              endAdornment:
                emailCheck === 'checking' ? <CircularProgress size={18} /> :
                emailCheck === 'ok' && email ? <Typography color="success.main" sx={{ fontSize: 13, ml: 1 }}>사용 가능</Typography> :
                emailCheck === 'exists' ? <Typography color="error" sx={{ fontSize: 13, ml: 1 }}>이미 사용중</Typography> : null
            }}
            error={emailCheck === 'exists'}
            helperText={emailCheck === 'exists' ? '이미 사용중인 이메일입니다.' : ''}
          />
          <TextField
            label="비밀번호"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            inputProps={{ minLength: 6 }}
            error={touched && password.length > 0 && password.length < 6}
            helperText={touched && password.length > 0 && password.length < 6 ? '비밀번호는 6자 이상 입력하세요.' : ''}
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
          {/* 약관 동의 영역 */}
          <Box sx={{ mt: 3, mb: 2, border: '1px solid #e0e0e0', borderRadius: 2, p: 2, background: '#fafbfc' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <FormControlLabel
                control={<Checkbox checked={allTerms} onChange={e => setAllTerms(e.target.checked)} />}
                label={<Typography variant="body2" sx={{ fontWeight: 700 }}>약관 전체동의</Typography>}
                sx={{ m: 0, flex: 1, justifyContent: 'flex-start' }}
              />
              <IconButton size="small" onClick={() => setTermsOpen(v => !v)}>
                {termsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
            <Collapse in={termsOpen}>
              <FormGroup sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
                  <Checkbox
                    checked={terms1}
                    onChange={e => setTerms1(e.target.checked)}
                    required
                    sx={{ p: 0, mr: 1.5 }}
                  />
                  <Typography variant="body2" sx={{ flexShrink: 0, textAlign: 'left' }}>
                    이용약관 동의 <Typography component="span" color="error" sx={{ display: 'inline' }}>*</Typography>
                  </Typography>
                  <Box sx={{ flex: 1 }} />
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', cursor: 'pointer', minWidth: 40, textAlign: 'right', ml: 2 }}
                    onClick={() => setModalOpen('terms1')}
                  >
                    보기
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Checkbox
                    checked={terms2}
                    onChange={e => setTerms2(e.target.checked)}
                    required
                    sx={{ p: 0, mr: 1.5 }}
                  />
                  <Typography variant="body2" sx={{ flexShrink: 0, textAlign: 'left' }}>
                    개인정보수집및동의 <Typography component="span" color="error" sx={{ display: 'inline' }}>*</Typography>
                  </Typography>
                  <Box sx={{ flex: 1 }} />
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', cursor: 'pointer', minWidth: 40, textAlign: 'right', ml: 2 }}
                    onClick={() => setModalOpen('terms2')}
                  >
                    보기
                  </Typography>
                </Box>
              </FormGroup>
            </Collapse>
          </Box>
          {/* 약관 보기 모달 */}
          <Dialog open={!!modalOpen} onClose={() => setModalOpen(null)} maxWidth="sm" fullWidth>
            <DialogTitle>{modalOpen ? TERMS[modalOpen].title : ''}</DialogTitle>
            <DialogContent>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{modalOpen ? TERMS[modalOpen].content : ''}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setModalOpen(null)} variant="contained">닫기</Button>
            </DialogActions>
          </Dialog>
          {touched && !canJoin && (
            <Alert severity="warning" sx={{ mt: 2, mb: 0 }}>
              모든 항목을 올바르게 입력하고 약관에 동의해 주세요.
            </Alert>
          )}
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button variant="outlined" color="inherit" fullWidth onClick={() => navigate(-1)}>
              취소하기
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={!canJoin}>
              가입하기
            </Button>
          </Box>
        </form>
      </Paper>
      <TermsModal
        open={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
      />
    </Container>
  );
};

export default JoinPage; 