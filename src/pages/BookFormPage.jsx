import { useState } from 'react';
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

function BookFormPage({
  onAddClick,
  onBackClick,
  onCancel,
  onSubmit,
  onSubmitWithAi,
  isEditing = false,
}) {
  const [genre, setGenre] = useState('');
  const [customGenre, setCustomGenre] = useState('');
  const [genreOpen, setGenreOpen] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);

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
          <ArrowBackIcon fontSize="small" />
          목록으로
        </Link>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          {isEditing ? '도서 수정' : '새 도서 등록'}
        </Typography>

        <Stack spacing={2.5}>
          <TextField
            label="제목"
            placeholder="책 제목을 입력하세요"
            required
            fullWidth
            size="small"
          />
          <TextField
            label="저자"
            placeholder="저자명"
            required
            fullWidth
            size="small"
          />
          <TextField
            label="출판사"
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
              type="date"
              fullWidth
              size="small"
            />
          </Box>
          <FormControl size="small" fullWidth>
            <InputLabel>장르</InputLabel>
            <Select
              label="장르"
              value={genre}
              open={genreOpen}
              onOpen={() => setGenreOpen(true)}
              onClose={() => setGenreOpen(false)}
              onChange={(e) => {
                setGenre(e.target.value);
                setCustomGenre('');
              }}
              MenuProps={{
                autoFocus: false,
                disableAutoFocusItem: true,
              }}
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
                      setTimeout(() => setGenreOpen(false), 0);
                    }
                  }}
                  autoComplete="off"
                />
                <Button
                  size="small"
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation();
                    setGenreOpen(false);
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
            placeholder="책 줄거리, 소개 등..."
            multiline
            minRows={6}
            fullWidth
            size="small"
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
            <Button variant="contained" onClick={onSubmit}>
              저장
            </Button>
          ) : (
            <Button variant="contained" onClick={() => setShowAiPanel(true)}>
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
          onGenerate={() => {
            // CRUD 담당자: 책 저장 + AI 표지 생성 + 상세 페이지로 이동을 여기서 처리
            setShowAiPanel(false);
            onSubmitWithAi?.();
          }}
        />
      </Dialog>
    </Box>
  );
}

export default BookFormPage;
