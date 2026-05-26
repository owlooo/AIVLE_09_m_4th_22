import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack,
  Link,
  Divider,
  Dialog,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/Header';
import AiCoverPanel from '../components/AiCoverPanel';
import { getBookById, createBook, updateBook } from '../bookService';

function BookFormPage({
  bookId,
  onAddClick,
  onBackClick,
  onCancel,
  onSubmit,
  onSubmitWithAi,
}) {
  const isEditing = !!bookId;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    publishDate: '',
    genres: [],
    description: '',
  });
  const [errors, setErrors] = useState({});

  // 장르 드롭다운 (직접 입력 지원)
  const [genreOpen, setGenreOpen] = useState(false);
  const [customGenre, setCustomGenre] = useState('');

  // AI 표지 생성 Dialog
  const [showAiPanel, setShowAiPanel] = useState(false);

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
          console.error('데이터 로드 실패:', error);
        }
      };
      fetchData();
    }
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // 장르: 단일 선택 (드롭다운에서 선택) + 직접 입력 시 customGenre로 사용
  const selectedGenre = customGenre || formData.genres?.[0] || '';

  const handleGenreSelect = (value) => {
    setCustomGenre('');
    setFormData((prev) => ({ ...prev, genres: value ? [value] : [] }));
  };

  const applyCustomGenre = () => {
    if (customGenre.trim()) {
      setFormData((prev) => ({ ...prev, genres: [customGenre.trim()] }));
    }
    setGenreOpen(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = '제목은 필수 입력입니다.';
    if (!formData.author.trim()) newErrors.author = '저자는 필수 입력입니다.';
    if (!formData.description.trim()) {
      newErrors.description = '책 소개는 필수 입력입니다.';
    } else if (formData.description.length < 10) {
      newErrors.description = '책 소개는 최소 10자 이상 작성해주세요.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    const dataToSave = { ...formData, content: formData.description };
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

  const openAiPanel = () => {
    if (!validate()) return;
    setShowAiPanel(true);
  };

  const handleSaveAndAi = async () => {
    const dataToSave = { ...formData, content: formData.description };
    try {
      let result;
      if (bookId) {
        result = await updateBook(bookId, dataToSave);
      } else {
        result = await createBook(dataToSave);
      }
      setShowAiPanel(false);
      // OpenAI 담당자: 여기서 AI 표지 생성 API 호출 + 책에 표지 URL 저장
      onSubmitWithAi?.(result?.id);
    } catch (error) {
      alert('저장에 실패했습니다.');
    }
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Header onAddClick={onAddClick} />

      <Container maxWidth="sm" sx={{ py: 4 }}>
        {/* 목록으로 돌아가기 */}
        <Link
          component="button"
          underline="hover"
          onClick={onBackClick}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            mb: 1,
            color: 'primary.main',
            fontSize: '0.9rem',
          }}
        >
          <ArrowBackIcon fontSize="small" /> 목록으로
        </Link>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          {isEditing ? '도서 수정' : '새 도서 등록'}
        </Typography>

        <Stack spacing={2.5}>
          <TextField
            label="제목"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="책 제목을 입력하세요"
            required
            fullWidth
            size="small"
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            label="저자"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="저자명"
            required
            fullWidth
            size="small"
            error={!!errors.author}
            helperText={errors.author}
          />
          <TextField
            label="출판사"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="출판사명"
            fullWidth
            size="small"
          />
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              component="label"
              htmlFor="publishDate"
              sx={{ display: 'block', mb: 0.5, ml: 0.25 }}
            >
              출판일
            </Typography>
            <TextField
              id="publishDate"
              name="publishDate"
              type="date"
              value={formData.publishDate}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Box>

          {/* 장르 — 직접 입력 지원 */}
          <FormControl size="small" fullWidth>
            <InputLabel>장르</InputLabel>
            <Select
              label="장르"
              value={selectedGenre}
              open={genreOpen}
              onOpen={() => setGenreOpen(true)}
              onClose={() => setGenreOpen(false)}
              onChange={(e) => handleGenreSelect(e.target.value)}
              MenuProps={{ autoFocus: false, disableAutoFocusItem: true }}
              renderValue={(val) => {
                if (customGenre) return `직접 입력: ${customGenre}`;
                return val;
              }}
            >
              <MenuItem value="소설">소설</MenuItem>
              <MenuItem value="에세이">에세이</MenuItem>
              <MenuItem value="자기계발">자기계발</MenuItem>
              <MenuItem value="인문">인문</MenuItem>
              <MenuItem value="경제경영">경제경영</MenuItem>
              <Divider />
              <Box
                sx={{ px: 2, py: 1, display: 'flex', gap: 1 }}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                onKeyDownCapture={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <TextField
                  size="small"
                  fullWidth
                  placeholder="예: 과학"
                  value={customGenre}
                  onChange={(e) => setCustomGenre(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.stopPropagation();
                      setTimeout(() => applyCustomGenre(), 0);
                    }
                  }}
                  autoComplete="off"
                />
                <Button
                  size="small"
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation();
                    applyCustomGenre();
                  }}
                  sx={{ flexShrink: 0 }}
                >
                  적용
                </Button>
              </Box>
            </Select>
          </FormControl>

          <TextField
            label="책 소개"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="책 줄거리, 소개 등..."
            multiline
            minRows={6}
            fullWidth
            size="small"
            error={!!errors.description}
            helperText={errors.description || '최소 10자 이상 입력해주세요.'}
          />
        </Stack>

        {/* 하단 버튼: 수정 모드면 "저장", 신규 등록이면 "저장 후 AI 표지 생성" */}
        <Stack
          direction="row"
          spacing={1.5}
          useFlexGap
          sx={{ justifyContent: 'flex-end', mt: 4, flexWrap: 'wrap' }}
        >
          <Button variant="outlined" onClick={onCancel}>
            취소
          </Button>
          {isEditing ? (
            <Button variant="contained" onClick={handleSave}>
              저장
            </Button>
          ) : (
            <Button variant="contained" onClick={openAiPanel}>
              저장 후 AI 표지 생성
            </Button>
          )}
        </Stack>
      </Container>

      {/* 저장 후 AI 표지 생성 — 화면 가운데 팝업(Dialog) */}
      <Dialog
        open={showAiPanel}
        onClose={() => setShowAiPanel(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { p: 2, bgcolor: 'background.paper' } }}
      >
        <AiCoverPanel
          onClose={() => setShowAiPanel(false)}
          onGenerate={handleSaveAndAi}
        />
      </Dialog>
    </Box>
  );
}

export default BookFormPage;
