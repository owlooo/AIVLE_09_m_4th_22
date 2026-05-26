import { useState, useEffect } from 'react';
import {
  Container, Box, Typography, TextField, Select, MenuItem, FormControl, 
  InputLabel, Button, Stack, Grid, Link, FormHelperText
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
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bookId) {
      const fetchData = async () => {
        try {
          const data = await getBookById(bookId);
          setFormData({
            title: data.title || '',
            author: data.author || '',
            publisher: data.publisher || '',
            publishDate: data.publishDate || '',
            genres: data.genres || [],
            description: data.description || data.content || '',
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
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = '제목은 필수 입력입니다.';
    }

    if (!formData.author.trim()) {
      newErrors.author = '저자는 필수 입력입니다.';
    }

    if (!formData.description.trim()) {
      newErrors.description = '책 소개는 필수 입력입니다.';
    } else if (formData.description.length < 10) {
      newErrors.description = '책 소개는 최소 10자 이상 작성해주세요.';
    }

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      return; 
    }

    const dataToSave = {
      ...formData,
      content: formData.description, 
    };

    try {
      if (bookId) {
        await updateBook(bookId, dataToSave);
        alert('수정되었습니다.');
      } else {
        await createBook(dataToSave);
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
          <ArrowBackIcon fontSize="small" /> 목록으로
        </Link>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          {bookId ? '도서 수정' : '새 도서 등록'}
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={2.5}>
              <TextField 
                label="제목 *" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                fullWidth 
                size="small" 
                error={!!errors.title}
                helperText={errors.title}
              />
              <TextField 
                label="저자 *" 
                name="author" 
                value={formData.author} 
                onChange={handleChange} 
                fullWidth 
                size="small" 
                error={!!errors.author}
                helperText={errors.author}
              />
              
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
                label="책 소개 *"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                minRows={6}
                fullWidth
                size="small"
                error={!!errors.description}
                helperText={errors.description || '최소 10자 이상 입력해주세요.'}
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