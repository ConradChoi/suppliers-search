import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Box, Container, Grid, Typography, Paper, Button, TextField, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Collapse, useTheme, useMediaQuery
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

// 게시글 mock 데이터
interface BoardItem {
  id: number;
  title: string;
  hasFile: boolean;
  author: string;
  createdAt: string;
}
const MOCK_BOARD: BoardItem[] = Array.from({ length: 123 }, (_, i) => ({
  id: 123 - i,
  title: `게시글 제목 ${123 - i}`,
  hasFile: Math.random() < 0.3,
  author: `작성자${(i % 10) + 1}`,
  createdAt: new Date(Date.now() - i * 1000 * 60 * 60).toLocaleString(),
}));

const PAGE_SIZE = 20;

const BoardPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showFilters, setShowFilters] = useState(() => (window.innerWidth < theme.breakpoints.values.sm ? false : true));
  const navigate = useNavigate();

  const [searchType, setSearchType] = useState('전체');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [displayed, setDisplayed] = useState<BoardItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 검색 필터링
  const filtered = useMemo(() => {
    if (!searchKeyword.trim()) return MOCK_BOARD;
    if (searchType === '전체') {
      return MOCK_BOARD.filter(item =>
        item.title.includes(searchKeyword) || item.author.includes(searchKeyword)
      );
    }
    if (searchType === '제목') {
      return MOCK_BOARD.filter(item => item.title.includes(searchKeyword));
    }
    if (searchType === '내용') {
      // 내용 필드는 없으므로 제목에서만 검색
      return MOCK_BOARD.filter(item => item.title.includes(searchKeyword));
    }
    return MOCK_BOARD;
  }, [searchType, searchKeyword]);

  // 무한스크롤 데이터 로딩
  useEffect(() => {
    setDisplayed(filtered.slice(0, PAGE_SIZE));
    setPage(1);
    setHasMore(filtered.length > PAGE_SIZE);
  }, [filtered]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      const next = filtered.slice(0, (page + 1) * PAGE_SIZE);
      setDisplayed(next);
      setPage(page + 1);
      setHasMore(next.length < filtered.length);
      setLoading(false);
    }, 500);
  };

  // 스크롤 감지
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore && !loading) {
        loadMore();
      }
    };
    const ref = listRef.current;
    if (ref) ref.addEventListener('scroll', handleScroll);
    return () => { if (ref) ref.removeEventListener('scroll', handleScroll); };
  }, [hasMore, loading, page, filtered]);

  // 초기화
  const handleReset = () => {
    setSearchType('전체');
    setSearchKeyword('');
  };

  useEffect(() => {
    setShowFilters(isMobile ? false : true);
  }, [isMobile]);

  return (
    <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
      <Grid container spacing={3}>
        {/* Left: 검색 (PC) */}
        {!isMobile && (
          <Grid item xs={12} md={3} lg={2}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>검색</Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>검색어 선택</InputLabel>
                <Select value={searchType} label="검색어 선택" onChange={e => setSearchType(e.target.value)}>
                  <MenuItem value="전체">전체</MenuItem>
                  <MenuItem value="제목">제목</MenuItem>
                  <MenuItem value="내용">내용</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="검색어 입력"
                fullWidth
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }} onClick={() => {}}>
                검색
              </Button>
              <Button variant="outlined" color="secondary" fullWidth onClick={handleReset}>
                초기화
              </Button>
            </Paper>
          </Grid>
        )}
        {/* Right: 게시글 목록 및 (MO)검색 */}
        <Grid item xs={12} md={9} lg={10}>
          {/* 모바일: 검색/필터 토글 */}
          {isMobile && (
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 1 }}>
              <Typography variant="h6">검색</Typography>
              <IconButton onClick={() => setShowFilters(!showFilters)}>
                <FilterListIcon />
              </IconButton>
            </Box>
          )}
          {/* 모바일: 검색영역 */}
          {isMobile && (
            <Collapse in={showFilters}>
              <Paper sx={{ p: 2, mb: 2 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>검색어 선택</InputLabel>
                  <Select value={searchType} label="검색어 선택" onChange={e => setSearchType(e.target.value)}>
                    <MenuItem value="전체">전체</MenuItem>
                    <MenuItem value="제목">제목</MenuItem>
                    <MenuItem value="내용">내용</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="검색어 입력"
                  fullWidth
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }} onClick={() => {}}>
                  검색
                </Button>
                <Button variant="outlined" color="secondary" fullWidth onClick={handleReset}>
                  초기화
                </Button>
              </Paper>
            </Collapse>
          )}
          {/* 게시글 목록 */}
          {isMobile ? (
            <Box>
              {displayed.map(item => (
                <Paper key={item.id} sx={{ mb: 2, p: 2, boxShadow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0, minWidth: 32 }}>
                      {item.id}
                    </Typography>
                    <Button variant="text" color="primary" sx={{ p: 0, minWidth: 0, ml: 1, fontWeight: 700, fontSize: 16 }} onClick={() => navigate(`/board/${item.id}`)}>
                      {item.title}
                    </Button>
                    {item.hasFile && <AttachFileIcon fontSize="small" sx={{ ml: 1 }} />}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">{item.author}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.createdAt}</Typography>
                  </Box>
                </Paper>
              ))}
              {loading && <Box sx={{ textAlign: 'center', py: 2 }}>로딩중...</Box>}
              {!hasMore && displayed.length === 0 && <Box sx={{ textAlign: 'center', py: 2 }}>게시글이 없습니다.</Box>}
            </Box>
          ) : (
            <TableContainer component={Box}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ width: 60 }}>번호</TableCell>
                    <TableCell sx={{ maxWidth: 220, minWidth: 80, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>제목</TableCell>
                    <TableCell align="center" sx={{ width: 60 }}>첨부</TableCell>
                    <TableCell align="center" sx={{ width: 100 }}>등록자명</TableCell>
                    <TableCell align="center" sx={{ width: 200, minWidth: 180 }}>등록일시</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayed.map(item => (
                    <TableRow key={item.id} hover>
                      <TableCell align="center">{item.id}</TableCell>
                      <TableCell>
                        <Button variant="text" color="primary" sx={{ p: 0, minWidth: 0 }} onClick={() => navigate(`/board/${item.id}`)}>
                          {item.title}
                        </Button>
                      </TableCell>
                      <TableCell align="center">{item.hasFile && <AttachFileIcon fontSize="small" />}</TableCell>
                      <TableCell align="center">{item.author}</TableCell>
                      <TableCell align="center">{item.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {loading && <Box sx={{ textAlign: 'center', py: 2 }}>로딩중...</Box>}
              {!hasMore && displayed.length === 0 && <Box sx={{ textAlign: 'center', py: 2 }}>게시글이 없습니다.</Box>}
            </TableContainer>
          )}
          {/* 플로팅 작성하기 버튼 */}
          <Box sx={{ position: 'fixed', bottom: { xs: 24, md: 40 }, right: { xs: 24, md: 40 }, zIndex: 1200 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: '50%', minWidth: 56, minHeight: 56, boxShadow: 3, p: 0 }}
              onClick={() => navigate('/board/write')}
            >
              <AddIcon fontSize="large" />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BoardPage; 