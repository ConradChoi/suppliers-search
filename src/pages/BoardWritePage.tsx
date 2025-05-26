import React, { useState, DragEvent } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Stack, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DeleteIcon from '@mui/icons-material/Delete';

const MAX_FILES = 2;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];

const BoardWritePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 등록 로직은 생략
    alert('등록되었습니다!');
    navigate('/board');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const filtered = newFiles.filter(f => {
      if (VIDEO_TYPES.includes(f.type)) return false;
      if (f.size > MAX_FILE_SIZE) {
        alert(`${f.name} 파일은 10MB를 초과하여 업로드할 수 없습니다.`);
        return false;
      }
      return true;
    });
    const merged = [...files, ...filtered].slice(0, MAX_FILES);
    setFiles(merged);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const newFiles = Array.from(e.dataTransfer.files);
    const filtered = newFiles.filter(f => {
      if (VIDEO_TYPES.includes(f.type)) return false;
      if (f.size > MAX_FILE_SIZE) {
        alert(`${f.name} 파일은 10MB를 초과하여 업로드할 수 없습니다.`);
        return false;
      }
      return true;
    });
    const merged = [...files, ...filtered].slice(0, MAX_FILES);
    setFiles(merged);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleRemoveFile = (idx: number) => {
    setFiles(files.filter((_, i) => i !== idx));
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>게시글 작성</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="제목"
            fullWidth
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>내용</Typography>
            <Box
              sx={{
                mb: 0,
                resize: 'vertical',
                overflow: 'auto',
                minHeight: 120,
                maxHeight: 600,
                border: '1px solid #ccc',
                borderRadius: 1,
                '& .ql-container': { minHeight: 120, maxHeight: 600, fontSize: 16 },
                '& .ql-editor': { minHeight: 120, maxHeight: 600 },
                background: '#fff',
              }}
            >
              <ReactQuill theme="snow" value={content} onChange={setContent} style={{ height: '100%' }} />
            </Box>
          </Box>
          <Box
            sx={{ mb: 3, p: 2, border: '2px dashed #bbb', borderRadius: 2, textAlign: 'center', bgcolor: dragActive ? '#f0f4ff' : 'inherit', cursor: 'pointer' }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              multiple
              accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,application/x-zip-compressed"
              style={{ display: 'none' }}
              id="file-upload"
              onChange={handleFileChange}
              disabled={files.length >= MAX_FILES}
            />
            <label htmlFor="file-upload">
              <Button variant="outlined" component="span" disabled={files.length >= MAX_FILES}>
                {files.length < MAX_FILES ? '파일 찾아보기' : '최대 2개까지 업로드 가능'}
              </Button>
            </label>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {`여기로 파일을 드래그&드롭하거나, 찾아보기로 최대 2개까지 업로드할 수 있습니다. (동영상 제외)`}
            </Typography>
            <List dense sx={{ mt: 1 }}>
              {files.map((file, idx) => (
                <ListItem key={file.name + idx} secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(idx)}>
                    <DeleteIcon />
                  </IconButton>
                }>
                  <ListItemText primary={file.name} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" color="inherit" onClick={() => navigate(-1)}>취소</Button>
            <Button type="submit" variant="contained" color="primary">작성하기</Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default BoardWritePage; 