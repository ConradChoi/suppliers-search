import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ko } from 'date-fns/locale';

interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  lastLoginAt: string;
  postCount: number;
  inquiryCount: number;
}

const UserListPage: React.FC = () => {
  // 검색 조건 상태
  const [searchType, setSearchType] = useState('all');
  const [dateType, setDateType] = useState('createdAt');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  // 페이지네이션 상태
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState('30');

  // 임시 데이터
  const users: User[] = [
    {
      id: 1,
      email: 'user1@example.com',
      name: '홍길동',
      createdAt: '2024-03-20 10:00:00',
      lastLoginAt: '2024-03-21 15:30:00',
      postCount: 5,
      inquiryCount: 2,
    },
    // ... 더 많은 임시 데이터
  ];

  const handleSearch = () => {
    // 검색 로직 구현
    console.log('Search:', { searchType, dateType, startDate, endDate, searchKeyword });
  };

  const handleReset = () => {
    setSearchType('all');
    setDateType('createdAt');
    setStartDate(null);
    setEndDate(null);
    setSearchKeyword('');
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handlePasswordReset = (userId: number) => {
    // 비밀번호 초기화 로직
    console.log('Reset password for user:', userId);
  };

  const handleDelete = (userId: number) => {
    // 삭제 로직
    console.log('Delete user:', userId);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          일반회원 관리
        </Typography>

        {/* 검색 영역 */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box component="form" sx={{ width: '100%' }}>
            <TableContainer>
              <Table size="small" sx={{ mb: 0 }}>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: 100, fontWeight: 'bold', background: '#f9f9f9' }}>기간검색</TableCell>
                    <TableCell sx={{ width: 140 }}>
                      <FormControl fullWidth size="small">
                        <Select
                          value={dateType}
                          onChange={(e) => setDateType(e.target.value)}
                        >
                          <MenuItem value="createdAt">등록일</MenuItem>
                          <MenuItem value="lastLogin">최근로그인</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell sx={{ width: 220 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DatePicker
                          label="시작일"
                          value={startDate}
                          onChange={(newValue: Date | null) => setStartDate(newValue)}
                          slotProps={{ textField: { size: 'small', fullWidth: false, sx: { minWidth: 90 } } }}
                        />
                        <span>~</span>
                        <DatePicker
                          label="종료일"
                          value={endDate}
                          onChange={(newValue: Date | null) => setEndDate(newValue)}
                          slotProps={{ textField: { size: 'small', fullWidth: false, sx: { minWidth: 90 } } }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ width: 80, fontWeight: 'bold', background: '#f9f9f9' }}>검색어</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <FormControl size="small" sx={{ minWidth: 90 }}>
                          <Select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                          >
                            <MenuItem value="all">전체</MenuItem>
                            <MenuItem value="email">이메일</MenuItem>
                            <MenuItem value="name">성명</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          size="small"
                          value={searchKeyword}
                          onChange={(e) => setSearchKeyword(e.target.value)}
                          placeholder="검색어 입력"
                          sx={{ minWidth: 120 }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={5} align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button variant="contained" onClick={handleSearch}>
                          검색
                        </Button>
                        <Button variant="outlined" onClick={handleReset}>
                          초기화
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>

        {/* 리스트 영역 */}
        <Paper>
          <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', fontSize: 15 }}>
            <Box>
              전체 회원 : <b>{users.length}명</b> / 목록 보기 :
              <Select
                size="small"
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                sx={{ mx: 1, width: 70 }}
              >
                <MenuItem value={'30'}>30▼</MenuItem>
                <MenuItem value={'50'}>50▼</MenuItem>
                <MenuItem value={'100'}>100▼</MenuItem>
              </Select>
            </Box>
            <Box>
              <Button size="small" variant="text" sx={{ fontWeight: 'bold', mr: 1 }} onClick={() => console.log('Selected delete')}>
                [선택 삭제]
              </Button>
              <Button size="small" variant="text" sx={{ fontWeight: 'bold' }} onClick={() => console.log('Excel download')}>
                [엑셀다운로드]
              </Button>
            </Box>
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: 800, border: '1px solid #222' }} size="small">
              <TableHead>
                <TableRow sx={{ background: '#fafafa' }}>
                  <TableCell align="center" sx={{ border: '1px solid #222', fontWeight: 'bold', width: 60 }}>번호</TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #222', fontWeight: 'bold' }}>이메일</TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #222', fontWeight: 'bold' }}>성명</TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #222', fontWeight: 'bold' }}>등록일시</TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #222', fontWeight: 'bold' }}>최근로그인일시</TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #222', fontWeight: 'bold', width: 60 }}>게시글</TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #222', fontWeight: 'bold', width: 60 }}>문의</TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #222', fontWeight: 'bold' }}>관리</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} />
                  <TableCell align="center" sx={{ border: '1px solid #222', fontWeight: 'bold', width: 60 }}>게시글</TableCell>
                  <TableCell align="center" sx={{ border: '1px solid #222', fontWeight: 'bold', width: 60 }}>문의</TableCell>
                  <TableCell sx={{ border: '1px solid #222' }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, idx) => (
                  <TableRow key={user.id}>
                    <TableCell align="center" sx={{ border: '1px solid #222' }}>{user.id}</TableCell>
                    <TableCell align="center" sx={{ border: '1px solid #222' }}>{user.email}</TableCell>
                    <TableCell align="center" sx={{ border: '1px solid #222' }}>{user.name}</TableCell>
                    <TableCell align="center" sx={{ border: '1px solid #222' }}>{user.createdAt}</TableCell>
                    <TableCell align="center" sx={{ border: '1px solid #222' }}>{user.lastLoginAt}</TableCell>
                    <TableCell align="center" sx={{ border: '1px solid #222' }}>{user.postCount}</TableCell>
                    <TableCell align="center" sx={{ border: '1px solid #222' }}>{user.inquiryCount}</TableCell>
                    <TableCell align="center" sx={{ border: '1px solid #222' }}>
                      <Button size="small" variant="text" sx={{ fontWeight: 'bold', p: 0, minWidth: 0, mr: 1 }} onClick={() => handlePasswordReset(user.id)}>
                        [비밀번호 초기화]
                      </Button>
                      <Button size="small" variant="text" sx={{ fontWeight: 'bold', p: 0, minWidth: 0 }} onClick={() => handleDelete(user.id)}>
                        [삭제]
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end', fontSize: 15 }}>
            {`< 1 of 10 >`}
          </Box>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default UserListPage; 