import React from 'react';
import { Box, Container, Link as MuiLink, Select, MenuItem, Typography } from '@mui/material';

const Footer: React.FC = () => {
  const [lang, setLang] = React.useState('ko');
  return (
    <Box sx={{ width: '100%', background: '#f2f2f2', borderTop: '1px solid #e0e0e0', pt: 1.5, pb: 0, position: 'fixed', bottom: 0, left: 0, zIndex: 1200 }}>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left: Language Selector */}
        <Box>
          <Select
            value={lang}
            onChange={e => setLang(e.target.value)}
            variant="standard"
            disableUnderline
            sx={{ fontSize: 14, background: 'transparent', minWidth: 80 }}
          >
            <MenuItem value="ko">한국어</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </Select>
        </Box>
        {/* Right: Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <MuiLink href="#" underline="hover" color="inherit" sx={{ fontSize: 14 }}>
            Terms
          </MuiLink>
          <MuiLink href="#" underline="hover" color="inherit" sx={{ fontSize: 14 }}>
            Privacy
          </MuiLink>
          <MuiLink href="#" underline="hover" color="inherit" sx={{ fontSize: 14 }}>
            YLIA
          </MuiLink>
          <MuiLink href="#" underline="hover" color="inherit" sx={{ fontSize: 14 }}>
            FAQ
          </MuiLink>
        </Box>
      </Container>
      <Box sx={{ width: '100%', textAlign: 'center', py: 1, background: 'transparent' }}>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} YLIA. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer; 