import React from 'react';
import { Box, Container, TextField, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';

const SearchBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '584px',
  margin: '0 auto',
  position: 'relative',
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '24px',
    padding: '0 16px',
    height: '44px',
    boxShadow: '0 1px 6px rgba(32,33,36,.28)',
    '&:hover': {
      boxShadow: '0 1px 6px rgba(32,33,36,.28)',
    },
    '&.Mui-focused': {
      boxShadow: '0 1px 6px rgba(32,33,36,.28)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const MainPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 600, color: '#4285f4' }}>
          Suppliers Search
        </Typography>
      </Box>
      <SearchBox>
        <SearchInput
          fullWidth
          variant="outlined"
          placeholder="공급사 또는 품목명을 입력해주세요."
          InputProps={{
            endAdornment: (
              <IconButton color="primary" sx={{ mr: 1 }}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </SearchBox>
    </Container>
  );
};

export default MainPage; 