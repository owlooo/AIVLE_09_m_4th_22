import { useState, useEffect } from 'react';
import {
  Container, Box, Typography, TextField, Select, MenuItem, FormControl, 
  InputLabel, Button, Stack, Grid, Link,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/Header';
import AiCoverPanel from '../components/AiCoverPanel';
import { getBookById, createBook, updateBook } from '../bookService';

function BookFormPage({ bookId, onAddClick, onBackClick, onCancel, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    publishDate: '',
    genres: [],
    description: '', // 'description'으로 통일
  });

  // 수정 모드일 때 데이터 로드
  useEffect(() => {
    if (bookId) {
      const fetchData = async () => {
        try {
          const data = await getBookById(bookId);
          // API에서 받아온 데이터가 있으면 state에 저장
          setFormData({
            title: data.title || '',
            author: data.author || '',
            publisher: data.publisher || '',
            publishDate: data.publishDate || '',
            genres: data.genres || [],
            description: data.description || '', // 데이터 매핑 확인
          });
        } catch (error) {
          console.error("데이터 로드 실패:", error);
        }
      };
      fetchData();
    }
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSave = async () => {
    const dataToSave = {...formData, content: formData.description};
    try {
      if (bookId) {
        await updateBook(bookId, formData);
        alert('수정되었습니다.');
      } else {
        await createBook(formData);
        alert('등록되었습니다.');
      }
      onSubmit();
    } catch (error) {
      alert('저장에 실패했습니다.');
    }
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Header onAddClick={onAddClick} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Link
          component="button"
          underline="hover"
          onClick={onBackClick}
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mb: 1, color: 'primary.main', fontSize: '0.9rem' }}
        >
          <ArrowBackIcon fontSize="small" />
          목록으로
        </Link>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          {bookId ? '도서 수정' : '새 도서 등록'}
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={2.5}>
              <TextField label="제목" name="title" value={formData.title} onChange={handleChange} fullWidth size="small" />
              <TextField label="저자" name="author" value={formData.author} onChange={handleChange} fullWidth size="small" />
              <Stack direction="row" spacing={2}>
                <TextField label="출판사" name="publisher" value={formData.publisher} onChange={handleChange} fullWidth size="small" />
                <TextField name="publishDate" type="date" value={formData.publishDate} onChange={handleChange} fullWidth size="small" InputLabelProps={{ shrink: true }} />
              </Stack>
              <FormControl size="small" fullWidth>
                <InputLabel>장르</InputLabel>
                <Select label="장르" name="genres" value={formData.genres || []} onChange={handleChange} multiple>
                  <MenuItem value="소설">소설</MenuItem>
                  <MenuItem value="에세이">에세이</MenuItem>
                  <MenuItem value="자기계발">자기계발</MenuItem>
                  <MenuItem value="베스트셀러">베스트셀러</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="책 소개"
                name="description" // 확실하게 name="description"으로 고정
                value={formData.description}
                onChange={handleChange}
                multiline
                minRows={6}
                fullWidth
                size="small"
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <AiCoverPanel />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'flex-end', mt: 4 }}>
          <Button variant="outlined" onClick={onCancel}>취소</Button>
          <Button variant="contained" onClick={handleSave}>저장하기</Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default BookFormPage;