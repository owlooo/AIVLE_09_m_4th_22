import { useState, useEffect } from 'react';
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
import { getBooks } from '../bookService';

function BookListPage({ onAddClick, onBookClick }) {
  const [books, setBooks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error('목록 불러오기 실패:', error);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      (book.author && book.author.toLowerCase().includes(searchKeyword.toLowerCase()));
    
    const matchesGenre = selectedGenre === '' || (book.genres && book.genres.includes(selectedGenre));
    
    return matchesSearch && matchesGenre;
  });

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Header onAddClick={onAddClick} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ alignItems: { xs: 'stretch', sm: 'center' }, mb: 5 }}
        >
          <TextField
            placeholder="제목 / 저자 검색..."
            size="small"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
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
            <Select 
              value={selectedGenre} 
              onChange={(e) => setSelectedGenre(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">전체 장르</MenuItem>
              <MenuItem value="소설">소설</MenuItem>
              <MenuItem value="에세이">에세이</MenuItem>
              <MenuItem value="자기계발">자기계발</MenuItem>
              <MenuItem value="베스트셀러">베스트셀러</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" color="text.secondary">
            총 {filteredBooks.length}권
          </Typography>
        </Stack>

        {filteredBooks.length === 0 ? (
          <Box sx={{ py: 8, textAlign: 'center', color: 'text.secondary', border: '1px dashed', borderColor: 'grey.300', borderRadius: 1 }}>
            <Typography variant="body1">해당 조건의 도서가 없습니다.</Typography>
          </Box>
        ) : (
          <Grid container spacing={4} rowSpacing={5}>
            {filteredBooks.map((book) => (
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