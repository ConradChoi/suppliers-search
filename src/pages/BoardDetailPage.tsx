import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button, Box, Stack, Divider, IconButton, List, ListItem, ListItemText, TextField } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// 임시 mock 데이터 (실제 서비스에서는 API로 대체)
const MOCK_BOARD = Array.from({ length: 123 }, (_, i) => ({
  id: 123 - i,
  title: `게시글 제목 ${123 - i}`,
  hasFile: Math.random() < 0.3,
  files: [
    { name: `첨부파일${123 - i}.pdf`, size: 1024 * 1024 * (i % 5 + 1) },
    { name: `이미지${123 - i}.jpg`, size: 512 * 1024 * (i % 3 + 1) },
  ].slice(0, Math.random() < 0.5 ? 1 : 2),
  author: `작성자${(i % 10) + 1}`,
  createdAt: new Date(Date.now() - i * 1000 * 60 * 60).toLocaleString(),
  content: `<p>이것은 게시글 <b>${123 - i}</b>의 <span style='color:#1976d2'>내용</span>입니다.</p>`
}));

const MOCK_COMMENTS = [
  { id: 1, author: '댓글러1', createdAt: '2024-06-01 10:00', content: '좋은 글이네요!', editable: false },
  { id: 2, author: '댓글러2', createdAt: '2024-06-01 11:00', content: '감사합니다.', editable: false },
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

const BoardDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = MOCK_BOARD.find(b => b.id === Number(id));
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [commentInput, setCommentInput] = useState('');

  if (!item) return <Box sx={{ p: 6, textAlign: 'center' }}>존재하지 않는 게시글입니다.</Box>;

  // 댓글 등록
  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        author: '나',
        createdAt: new Date().toLocaleString(),
        content: commentInput,
        editable: true,
      },
    ]);
    setCommentInput('');
  };

  // 댓글 삭제
  const handleDeleteComment = (cid: number) => {
    setComments(comments.filter(c => c.id !== cid));
  };

  // 댓글 수정(간단하게 alert)
  const handleEditComment = (cid: number) => {
    const c = comments.find(c => c.id === cid);
    if (!c) return;
    const newContent = prompt('댓글 수정', c.content);
    if (newContent !== null && newContent.trim()) {
      setComments(comments.map(c => c.id === cid ? { ...c, content: newContent } : c));
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        {/* 제목 */}
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>{item.title}</Typography>
        {/* 등록자 | 등록일시 | 조회수 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">{item.author}</Typography>
          <Typography variant="body2" color="text.secondary">{item.createdAt}</Typography>
          <Typography variant="body2" color="text.secondary">조회수 123</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        {/* 내용 */}
        <Box sx={{ mb: 4 }}>
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </Box>
        {/* 첨부파일 */}
        {item.files && item.files.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>첨부파일</Typography>
            <List dense>
              {item.files.map((f, idx) => (
                <ListItem key={f.name + idx}>
                  <AttachFileIcon fontSize="small" sx={{ mr: 1 }} />
                  <ListItemText primary={`${f.name} (${formatBytes(f.size)})`} />
                  <Button size="small" variant="outlined">다운로드</Button>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        {/* 하단 버튼 */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mb: 4 }}>
          <Button variant="outlined" color="error">삭제하기</Button>
          <Button variant="contained" color="primary" onClick={() => navigate(`/board/${item.id}/edit`)}>수정하기</Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>목록</Button>
        </Stack>
        {/* 댓글 영역 */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>댓글</Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <TextField
              label="댓글을 입력하세요"
              fullWidth
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }}
            />
            <Button variant="contained" onClick={handleAddComment}>등록</Button>
          </Stack>
          <List>
            {comments.map(c => (
              <ListItem key={c.id} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'stretch', mb: 2, p: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">{c.author} | {c.createdAt}</Typography>
                  <Box>
                    <IconButton size="small" onClick={() => handleEditComment(c.id)}><EditIcon fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => handleDeleteComment(c.id)}><DeleteIcon fontSize="small" /></IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ ml: 0.5 }}>{c.content}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default BoardDetailPage; 