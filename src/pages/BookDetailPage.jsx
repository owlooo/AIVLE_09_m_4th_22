import { useEffect, useState } from 'react';
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
import BookCard from '../components/BookCard';
import { getBookById, getBooks, deleteBook } from '../bookService';
import { saveBookPreference } from '../preferenceService';

function BookDetailPage({ bookId, onAddClick, onBackClick, onEditClick, onDeleteClick, onBookClick, onLogoClick }) {
  const [book, setBook] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [showAiPanel, setShowAiPanel] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookById(bookId);
        setBook(data);

        try {
          const allBooks = await getBooks();
          
          const currentGenres = data.genres || [];
          const currentTags = data.tags || [];

          const recs = allBooks
            .filter((b) => b.id !== data.id)
            .map((b) => {
              let score = 0;
              const bookGenres = b.genres || [];
              const bookTags = b.tags || [];

              const hasMatchingGenre = bookGenres.some((g) => currentGenres.includes(g));
              if (hasMatchingGenre) {
                score += 5;
              }

              const matchingTagsCount = bookTags.filter((t) => currentTags.includes(t)).length;
              score += matchingTagsCount * 2;

              return { ...b, score };
            })
            .filter((b) => b.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

          setRecommendedBooks(recs);
        } catch {
          setRecommendedBooks([]);
        }
      } catch (error) {
        alert('도서 정보를 불러오는데 실패했습니다.');
        onBackClick();
      }
    };
    if (bookId) fetchData();
  }, [bookId, onBackClick]);

  useEffect(() => {
    if (book) {
      saveBookPreference(book);
    }
  }, [book]);

  const handleDelete = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await deleteBook(bookId);
        onDeleteClick();
      } catch (error) {
        alert('삭제에 실패했습니다.');
      }
    }
  };

  if (!book) return <Box sx={{ p: 4 }}>로딩 중...</Box>;

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Header onAddClick={onAddClick} onLogoClick={onLogoClick} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Link
          component="button"
          underline="hover"
          onClick={onBackClick}
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mb: 3, color: 'primary.main' }}
        >
          <ArrowBackIcon fontSize="small" />
          목록으로
        </Link>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 5, md: 4 }}>
            <Box sx={{ width: '100%', maxWidth: 360, aspectRatio: '3 / 4', bgcolor: 'grey.100', border: '1px dashed', borderColor: 'grey.300', borderRadius: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'grey.500' }}>
              {book.coverImageUrl ? (
                <Box component="img" src={book.coverImageUrl} alt={book.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <Stack spacing={1} sx={{ alignItems: 'center' }}>
                  <ImageIcon fontSize="large" />
                  <Typography variant="body2">표지 이미지</Typography>
                </Stack>
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 7, md: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>{book.title}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                {[book.author, book.publisher, book.publishDate].filter(Boolean).join(' · ')}
            </Typography>

            {book.genres && (
              <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
                {book.genres.map((genre) => (
                  <Chip key={genre} label={genre} size="small" color="primary" variant="outlined" />
                ))}
              </Stack>
            )}

            {book.tags?.length > 0 && (
              <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap' }}>
                {book.tags.map((tag) => (
                  <Chip key={tag} label={`#${tag}`} size="small" variant="outlined" />
                ))}
              </Stack>
            )}

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{ mt: 3, flexWrap: 'wrap' }}
            >
              <Button variant="outlined" startIcon={<EditIcon />} onClick={onEditClick}>수정</Button>
              <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>삭제</Button>
              <Button variant="contained" onClick={() => setShowAiPanel((v) => !v)}>AI 표지 수정</Button>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>책 소개</Typography>
            <Typography variant="body1" color="text.primary" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
              {/* description이 있으면 우선 표시하고, 없으면 content를 표시 */}
              {book.description || book.content || "등록된 소개글이 없습니다."}
            </Typography>
          </Grid>
        </Grid>

        {/* 추천 도서 — 같은 장르의 다른 책 최대 3개 */}
        {recommendedBooks.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              이 책과 비슷한 책
            </Typography>
            <Grid container spacing={3}>
              {recommendedBooks.map((rec) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={rec.id}>
                  <BookCard book={rec} onClick={() => onBookClick?.(rec.id)} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>

      {/* AI 표지 생성 — 화면 가운데 팝업(Dialog) */}
      <Dialog
        open={showAiPanel}
        onClose={() => setShowAiPanel(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { p: 2, bgcolor: 'background.paper' } }}
      >
        <AiCoverPanel
          book={book}
          onClose={() => setShowAiPanel(false)}
          onCoverGenerated={(updatedBook) => {
            setBook((prev) => ({ ...prev, ...updatedBook }));
            setShowAiPanel(false);
          }}
        />
      </Dialog>
    </Box>
  );
}

export default BookDetailPage;