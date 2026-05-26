import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Divider,
  Link,
  Grid,
  Dialog,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import Header from '../components/Header';
import AiCoverPanel from '../components/AiCoverPanel';

// Mock 데이터 (UI 미리보기용)
const MOCK_BOOK = {
  id: 1,
  title: '도서 제목',
  author: '저자명',
  publisher: '출판사',
  publishDate: '2024.05.20',
  genres: ['소설', '베스트셀러'],
  description:
    '책 소개 내용이 여기에 들어갑니다. 이 책은 어떤 이야기를 담고 있고, 누가 읽으면 좋을지에 대한 소개가 자리합니다. 여러 줄로 표시될 수 있으며, 책의 분위기와 핵심 메시지를 전달합니다.',
  coverImageUrl: '',
};

function BookDetailPage({ onAddClick, onBackClick, onEditClick, onDeleteClick }) {
  const book = MOCK_BOOK;
  const [showAiPanel, setShowAiPanel] = useState(false);

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Header onAddClick={onAddClick} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* 목록으로 돌아가기 */}
        <Link
          component="button"
          underline="hover"
          onClick={onBackClick}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            mb: 3,
            color: 'primary.main',
            fontSize: '0.9rem',
          }}
        >
          <ArrowBackIcon fontSize="small" />
          목록으로
        </Link>

        <Grid container spacing={4}>
          {/* 왼쪽: 표지 이미지 */}
          <Grid size={{ xs: 12, sm: 5, md: 4 }}>
            <Stack spacing={2} sx={{ maxWidth: 360 }}>
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '3 / 4',
                  bgcolor: 'grey.100',
                  border: '1px dashed',
                  borderColor: 'grey.300',
                  borderRadius: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'grey.500',
                }}
              >
                {book.coverImageUrl ? (
                  <Box
                    component="img"
                    src={book.coverImageUrl}
                    alt={book.title}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <Stack spacing={1} sx={{ alignItems: 'center' }}>
                    <ImageIcon fontSize="large" />
                    <Typography variant="body2">표지 이미지</Typography>
                  </Stack>
                )}
              </Box>

            </Stack>
          </Grid>

          {/* 오른쪽: 상세 정보 */}
          <Grid size={{ xs: 12, sm: 7, md: 8 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 700, wordBreak: 'break-word' }}
            >
              {book.title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ wordBreak: 'break-word' }}
            >
              {book.author} · {book.publisher} · {book.publishDate}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ mt: 2, flexWrap: 'wrap' }}
            >
              {book.genres.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ mt: 3, flexWrap: 'wrap' }}
            >
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={onEditClick}
              >
                수정
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={onDeleteClick}
              >
                삭제
              </Button>
              <Button
                variant="contained"
                onClick={() => setShowAiPanel((v) => !v)}
              >
                AI 표지 수정
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              책 소개
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}
            >
              {book.description}
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* AI 표지 생성 — 화면 가운데 팝업(Dialog) */}
      <Dialog
        open={showAiPanel}
        onClose={() => setShowAiPanel(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { p: 2, bgcolor: 'background.paper' } }}
      >
        <AiCoverPanel onClose={() => setShowAiPanel(false)} />
      </Dialog>
    </Box>
  );
}

export default BookDetailPage;
