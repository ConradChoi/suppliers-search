import React, { useState, useMemo } from 'react';
import { Box, Container, Grid, Typography, Paper, List, ListItem, ListItemButton, ListItemText, IconButton, Collapse } from '@mui/material';
import SupplierCard from '../components/SupplierCard';
import { CATEGORIES, MOCK_SUPPLIERS } from './SuppliersPage';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Supplier {
  id: string;
  image: string;
  category: string;
  companyName: string;
  businessNumber: string;
  ceoName: string;
  zone1: string;
  zone2: string;
  phone: string;
  website: string;
  rating: number;
  likes: number;
  isLiked: boolean;
}

const Top100Page: React.FC = () => {
  const [selectedCate1, setSelectedCate1] = useState<string>('전체');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showCategory, setShowCategory] = useState(() => (window.innerWidth < theme.breakpoints.values.sm ? false : true));

  // 1차 카테고리 필터링
  const filteredSuppliers = useMemo(() => {
    let list: Supplier[] = MOCK_SUPPLIERS;
    if (selectedCate1 !== '전체') {
      list = list.filter((s: Supplier) => {
        // 1차 카테고리와 3차 카테고리 매핑
        const cate2s: string[] = CATEGORIES.cate2[selectedCate1] || [];
        const cate3s: string[] = cate2s.flatMap((c2: string) => CATEGORIES.cate3[c2] || []);
        return cate3s.includes(s.category);
      });
    }
    // 정렬: 평점 내림차순, 평점 동일시 좋아요 내림차순, 좋아요 동일시 평점 내림차순
    return list.slice().sort((a: Supplier, b: Supplier) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      if (b.likes !== a.likes) return b.likes - a.likes;
      return b.rating - a.rating;
    }).slice(0, 100);
  }, [selectedCate1]);

  return (
    <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      {isMobile ? (
        <Box>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6">1차 품목</Typography>
            <IconButton onClick={() => setShowCategory((v) => !v)}>
              {showCategory ? <CloseIcon /> : <FilterListIcon />}
            </IconButton>
          </Box>
          <Collapse in={showCategory}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <List>
                {CATEGORIES.cate1.map((cate: string) => (
                  <ListItem key={cate} disablePadding>
                    <ListItemButton selected={selectedCate1 === cate} onClick={() => { setSelectedCate1(cate); setShowCategory(false); }}>
                      <ListItemText primary={cate} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Collapse>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
              TOP 100 공급사 {selectedCate1 !== '전체' ? `- ${selectedCate1}` : ''}
            </Typography>
            <Grid container spacing={3}>
              {filteredSuppliers.map((supplier: Supplier, idx: number) => (
                <Grid item xs={12} key={supplier.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6" sx={{ width: 48, flexShrink: 0, textAlign: 'center', color: 'primary.main' }}>{idx + 1}</Typography>
                    <SupplierCard supplier={supplier} viewMode="list" onLikeClick={() => {}} />
                  </Box>
                </Grid>
              ))}
              {filteredSuppliers.length === 0 && (
                <Grid item xs={12}>
                  <Typography color="text.secondary">해당 카테고리에 등록된 공급사가 없습니다.</Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Left: 1차 품목 카테고리 */}
          <Grid item xs={12} md={3} lg={2}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>1차 품목</Typography>
              <List>
                {CATEGORIES.cate1.map((cate: string) => (
                  <ListItem key={cate} disablePadding>
                    <ListItemButton selected={selectedCate1 === cate} onClick={() => setSelectedCate1(cate)}>
                      <ListItemText primary={cate} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          {/* Right: TOP100 리스트 */}
          <Grid item xs={12} md={9} lg={10}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                TOP 100 공급사 {selectedCate1 !== '전체' ? `- ${selectedCate1}` : ''}
              </Typography>
              <Grid container spacing={3}>
                {filteredSuppliers.map((supplier: Supplier, idx: number) => (
                  <Grid item xs={12} key={supplier.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="h6" sx={{ width: 48, flexShrink: 0, textAlign: 'center', color: 'primary.main' }}>{idx + 1}</Typography>
                      <SupplierCard supplier={supplier} viewMode="list" onLikeClick={() => {}} />
                    </Box>
                  </Grid>
                ))}
                {filteredSuppliers.length === 0 && (
                  <Grid item xs={12}>
                    <Typography color="text.secondary">해당 카테고리에 등록된 공급사가 없습니다.</Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Top100Page; 