import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 6 }, borderRadius: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#4285f4', mb: 2 }}>
          About Suppliers Search
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, color: 'text.primary', fontWeight: 500 }}>
          찾기 힘든 공급사들을 만나볼 수 있는 곳
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          철저하게 고객들이 평가하고, 원하고, 신뢰할 수 있는 공급사가 있습니다.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2' }}>1,234</Typography>
              <Typography variant="body2" color="text.secondary">공급사</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2' }}>14</Typography>
              <Typography variant="body2" color="text.secondary">표준 카테고리</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2' }}>1,234</Typography>
              <Typography variant="body2" color="text.secondary">이용자 수</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default About; 