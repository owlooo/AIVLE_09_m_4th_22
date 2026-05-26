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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import Header from '../components/Header';

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

  return (
  <Box
    sx={{
      bgcolor: '#f5f7fb',
      minHeight: '100vh',
    }}
  >
    <Header onAddClick={onAddClick} />

    <Container maxWidth="lg" sx={{ py: 4 }}>
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
          fontWeight: 600,
          fontSize: '1rem',
        }}
      >
        <ArrowBackIcon fontSize="small" />
        목록으로
      </Link>

      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: 4,
          p: { xs: 3, md: 4 },
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
        }}
      >
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, sm: 5, md: 4 }}>
            <Box
              sx={{
                width: '100%',
                maxWidth: 360,
                aspectRatio: '3 / 4',
                bgcolor: '#eef4ff',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8fa2bf',
              }}
            >
              {book.coverImageUrl ? (
                <Box
                  component="img"
                  src={book.coverImageUrl}
                  alt={book.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 3,
                  }}
                />
              ) : (
                <Stack spacing={1} sx={{ alignItems: 'center' }}>
                  <ImageIcon sx={{ fontSize: 52, color: '#a8b7d4' }} />
                  <Typography variant="body2">표지 이미지</Typography>
                </Stack>
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 7, md: 8 }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 800,
                wordBreak: 'break-word',
                color: '#172033',
              }}
            >
              {book.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                wordBreak: 'break-word',
                color: '#667085',
                fontSize: '1.05rem',
              }}
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
                  sx={{
                    borderRadius: 999,
                    fontWeight: 600,
                    bgcolor: '#f8fbff',
                  }}
                />
              ))}
            </Stack>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={onEditClick}
                sx={{
                  borderRadius: 2,
                  px: 2.5,
                  fontWeight: 700,
                }}
              >
                수정
              </Button>

              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={onDeleteClick}
                sx={{
                  borderRadius: 2,
                  px: 2.5,
                  fontWeight: 700,
                }}
              >
                삭제
              </Button>
            </Stack>

            <Divider sx={{ my: 4 }} />

            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  bgcolor: '#eaf2ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.main',
                  fontWeight: 700,
                }}
              >
                📘
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                책 소개
              </Typography>
            </Stack>

            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'pre-line',
                lineHeight: 1.9,
                color: '#4b5563',
                fontSize: '1.02rem',
              }}
            >
              {book.description}
            </Typography>
            
          </Grid>
        </Grid>
      </Box>
    </Container>
  </Box>
);
}

export default BookDetailPage;
