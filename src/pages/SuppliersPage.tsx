import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Divider,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  IconButton,
  Collapse,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import FilterListIcon from '@mui/icons-material/FilterList';
import SupplierCard from '../components/SupplierCard';

// 타입 정의
interface CategoryMap { [key: string]: string[]; }
interface ZoneMap { [key: string]: string[]; }

// 예시 데이터
const CATEGORIES = {
  cate1: ['전체', '비품/소모품', '인쇄', '마케팅', '정보통신'],
  cate2: {
    비품/소모품: ['전체', '공장용소모품', '사무용품', '도서/전자데이터'],
    인쇄: ['전체', '명함', '현수막/배너', '포스터/전단지', '스티커'],
    마케팅: ['전체', '판촉물', '디지털광고'],
    정보통신: ['전체', '하드웨어', '소프트웨어', '시스템개발'],
  } as CategoryMap,
  cate3: {
    공장용소모품: ['전체', '공장용소모품'],
    사무용품: ['전체', '사무용품'],
    도서/전자데이터: ['전체', '도서/잡지'],
    명함: ['전체', '명함'],
    현수막/배너: ['전체', '현수막/배너'],
    포스터/전단지: ['전체', '포스터/전단지'],
    스티커: ['전체', '스티커'],
    판촉물: ['전체', '판촉물', '모바일상품권/기프티콘'],
    디지털광고: ['전체', '디지털광고 제작 및 운영', '바이럴마케팅'],
    하드웨어: ['전체', 'PC/노트북', '서버/네트워크'],
    소프트웨어: ['전체', '생산용 SW', '시스템 SW'],
    시스템개발: ['전체', '시스템 구축', '유지 보수'],
  } as CategoryMap,
};
const ZONES = {
  zone1: ['전체', '서울', '경기', '부산'],
  zone2: {
    서울: ['전체', '강남구', '서초구', '송파구'],
    경기: ['전체', '수원시', '성남시', '고양시'],
    부산: ['전체', '해운대구', '수영구'],
  } as ZoneMap,
};

// Mock data for suppliers
const MOCK_SUPPLIERS = Array.from({ length: 20 }, (_, i) => ({
  id: `supplier-${i + 1}`,
  image: `https://picsum.photos/400/300?random=${i + 1}`,
  category: ['선반', '밀링', '펌프', '콤프레서', '장비', '소재'][Math.floor(Math.random() * 6)],
  companyName: `공급사 ${i + 1}`,
  businessNumber: `123-45-${String(i + 1).padStart(5, '0')}`,
  ceoName: `대표자 ${i + 1}`,
  zone1: ['서울', '경기', '부산'][Math.floor(Math.random() * 3)],
  zone2: ['강남구', '서초구', '송파구', '수원시', '성남시', '고양시', '해운대구', '수영구'][Math.floor(Math.random() * 8)],
  phone: `02-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
  website: 'https://example.com',
  rating: Math.random() * 5,
  likes: Math.floor(Math.random() * 100),
  isLiked: false,
}));

const SuppliersPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showFilters, setShowFilters] = useState(() => (window.innerWidth < theme.breakpoints.values.sm ? false : true));

  // 화면 크기 변경 시 showFilters 동기화
  useEffect(() => {
    setShowFilters(isMobile ? false : true);
  }, [isMobile]);

  // 품목
  const [cate1, setCate1] = useState('전체');
  const [cate2, setCate2] = useState('전체');
  const [cate3, setCate3] = useState('전체');
  // 지역
  const [zone1, setZone1] = useState('전체');
  const [zone2, setZone2] = useState('전체');
  // 검색어
  const [keyword, setKeyword] = useState('');

  // View mode and suppliers state
  const [viewMode, setViewMode] = useState<'gallery' | 'list'>('gallery');
  const [suppliers, setSuppliers] = useState<typeof MOCK_SUPPLIERS>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 2차, 3차 품목 옵션
  const cate2Options = cate1 !== '전체' ? CATEGORIES.cate2[cate1] || ['전체'] : ['전체'];
  const cate3Options = cate2 !== '전체' ? CATEGORIES.cate3[cate2] || ['전체'] : ['전체'];
  // 상세지역 옵션
  const zone2Options = zone1 !== '전체' ? ZONES.zone2[zone1] || ['전체'] : ['전체'];

  // Load more suppliers
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newSuppliers = MOCK_SUPPLIERS.slice((page - 1) * 8, page * 8);
      if (newSuppliers.length === 0) {
        setHasMore(false);
      } else {
        setSuppliers(prev => [...prev, ...newSuppliers]);
        setPage(prev => prev + 1);
      }
      setLoading(false);
    }, 1000);
  }, [page, loading, hasMore]);

  // Initial load
  useEffect(() => {
    loadMore();
  }, [loadMore]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const target = document.getElementById('load-more-trigger');
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [loadMore]);

  // Handle like click
  const handleLikeClick = (id: string) => {
    setSuppliers(prev =>
      prev.map(supplier =>
        supplier.id === id
          ? {
              ...supplier,
              isLiked: !supplier.isLiked,
              likes: supplier.isLiked ? supplier.likes - 1 : supplier.likes + 1,
            }
          : supplier
      )
    );
  };

  return (
    <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      <Grid container spacing={3}>
        {/* Left: Filter */}
        <Grid item xs={12} md={3} lg={2} sx={{ order: { xs: 1, md: 1 } }}>
          {isMobile && (
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 1 }}>
              <Typography variant="h6">검색</Typography>
              <IconButton onClick={() => setShowFilters(!showFilters)}>
                <FilterListIcon />
              </IconButton>
            </Box>
          )}
          <Collapse in={showFilters}>
            <Paper sx={{ p: 3, mb: 2 }}>
              {!isMobile && (
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  검색/필터
                </Typography>
              )}
              <Divider sx={{ mb: 2 }} />
              {/* 품목 선택 */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>1차 품목</InputLabel>
                <Select value={cate1} label="1차 품목" onChange={e => { setCate1(e.target.value); setCate2('전체'); setCate3('전체'); }}>
                  {CATEGORIES.cate1.map((opt: string) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }} disabled={cate1 === '전체'}>
                <InputLabel>2차 품목</InputLabel>
                <Select value={cate2} label="2차 품목" onChange={e => { setCate2(e.target.value); setCate3('전체'); }}>
                  {cate2Options.map((opt: string) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }} disabled={cate2 === '전체'}>
                <InputLabel>3차 품목</InputLabel>
                <Select value={cate3} label="3차 품목" onChange={e => setCate3(e.target.value)}>
                  {cate3Options.map((opt: string) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* 지역 선택 */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>지역</InputLabel>
                <Select value={zone1} label="지역" onChange={e => { setZone1(e.target.value); setZone2('전체'); }}>
                  {ZONES.zone1.map((opt: string) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }} disabled={zone1 === '전체'}>
                <InputLabel>상세지역</InputLabel>
                <Select value={zone2} label="상세지역" onChange={e => setZone2(e.target.value)}>
                  {zone2Options.map((opt: string) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* 검색어 입력 */}
              <TextField
                label="검색어 입력"
                fullWidth
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>검색</Button>
              <Button variant="outlined" color="secondary" fullWidth onClick={() => {
                setCate1('전체');
                setCate2('전체');
                setCate3('전체');
                setZone1('전체');
                setZone2('전체');
                setKeyword('');
              }}>초기화</Button>
            </Paper>
          </Collapse>
        </Grid>
        {/* Right: Content */}
        <Grid item xs={12} md={9} lg={10} sx={{ order: { xs: 2, md: 2 } }}>
          <Paper sx={{ p: 4 }}>
            {/* Header with count and view mode toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                전체 {suppliers.length}개
              </Typography>
              {!isMobile && (
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(_, newMode) => newMode && setViewMode(newMode)}
                  size="small"
                >
                  <ToggleButton value="gallery">
                    <ViewModuleIcon />
                  </ToggleButton>
                  <ToggleButton value="list">
                    <ViewListIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            </Box>

            {/* Supplier list */}
            <Grid container spacing={3}>
              {suppliers.map((supplier) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={viewMode === 'gallery' ? 4 : 12}
                  lg={viewMode === 'gallery' ? 3 : 12}
                  key={supplier.id}
                >
                  <SupplierCard
                    supplier={supplier}
                    viewMode={isMobile ? 'gallery' : viewMode}
                    onLikeClick={handleLikeClick}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Loading indicator and infinite scroll trigger */}
            <Box
              id="load-more-trigger"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 3,
                height: '50px',
              }}
            >
              {loading ? (
                <CircularProgress />
              ) : !hasMore && suppliers.length > 0 ? (
                <Typography variant="body2" color="text.secondary">
                  마지막 입니다.
                </Typography>
              ) : null}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SuppliersPage;
export { CATEGORIES, MOCK_SUPPLIERS }; 