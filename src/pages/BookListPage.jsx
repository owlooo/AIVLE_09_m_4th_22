import {
  Container,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  Typography,
  Grid,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../components/Header';
import BookCard from '../components/BookCard';

// Mock 데이터 (UI 미리보기용) — 추후 API 연동 시 교체
const MOCK_BOOKS = [
  { id: 1, title: '도서 제목 1', author: '저자명', genres: ['소설', '베스트셀러'] },
  { id: 2, title: '도서 제목 2', author: '저자명', genres: ['소설', '베스트셀러'] },
  { id: 3, title: '도서 제목 3', author: '저자명', genres: ['소설', '베스트셀러'] },
  { id: 4, title: '도서 제목 4', author: '저자명', genres: ['소설', '베스트셀러'] },
  { id: 5, title: '도서 제목 5', author: '저자명', genres: ['소설', '베스트셀러'] },
  { id: 6, title: '도서 제목 6', author: '저자명', genres: ['소설', '베스트셀러'] },
];

function BookListPage({ onAddClick, onBookClick }) {
  const totalCount = MOCK_BOOKS.length;

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Header onAddClick={onAddClick} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* 검색 + 필터 영역 */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            alignItems: { xs: 'stretch', sm: 'center' },
            mb: 5,
          }}
        >
          <TextField
            placeholder="제목 / 저자 검색..."
            size="small"
            sx={{ flexGrow: 1, maxWidth: { sm: 480 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select defaultValue="" displayEmpty>
              <MenuItem value="">전체 장르</MenuItem>
              <MenuItem value="소설">소설</MenuItem>
              <MenuItem value="에세이">에세이</MenuItem>
              <MenuItem value="자기계발">자기계발</MenuItem>
              <MenuItem value="베스트셀러">베스트셀러</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" color="text.secondary">
            총 {totalCount}권
          </Typography>
        </Stack>

        {/* 카드 그리드 (도서 없을 때 Empty State 표시) */}
        {MOCK_BOOKS.length === 0 ? (
          <Box
            sx={{
              py: 8,
              textAlign: 'center',
              color: 'text.secondary',
              border: '1px dashed',
              borderColor: 'grey.300',
              borderRadius: 1,
            }}
          >
            <Typography variant="body1">등록된 도서가 없습니다.</Typography>
          </Box>
        ) : (
          <Grid container spacing={4} rowSpacing={5}>
            {MOCK_BOOKS.map((book) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={book.id}>
                <BookCard book={book} onClick={() => onBookClick?.(book.id)} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default BookListPage;
