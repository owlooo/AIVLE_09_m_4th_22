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
  Grid,
  Link,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/Header';
import AiCoverPanel from '../components/AiCoverPanel';

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    bgcolor: '#fff',
  },
};
function BookFormPage({ onAddClick, onBackClick, onCancel, onSubmit }) {
  return (
  <Box sx={{ bgcolor: '#f5f7fb', minHeight: '100vh' }}>
    <Header onAddClick={onAddClick} />

    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: 4,
          p: { xs: 3, md: 4 },
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
        }}
      >
        <Link
          component="button"
          underline="hover"
          onClick={onBackClick}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            mb: 2,
            color: 'primary.main',
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          <ArrowBackIcon fontSize="small" />
          목록으로
        </Link>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 1,
            color: '#172033',
          }}
        >
          새 도서 등록
        </Typography>

        <Typography sx={{ color: '#667085', mb: 4 }}>
          도서 정보를 입력하고 표지 이미지를 등록하세요.
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                border: '1px solid',
                borderColor: '#e5e7eb',
                borderRadius: 3,
                p: 3,
              }}
            >
              <Stack spacing={2.5}>
                <TextField
                  label="제목"
                  placeholder="도서 제목을 입력하세요"
                  required
                  fullWidth
                  size="small"
                  sx={inputStyle}
                />
                <TextField
                  label="저자"
                  placeholder="저자명을 입력하세요"
                  required
                  fullWidth
                  size="small"
                  sx={inputStyle}
                />
                <TextField
                  label="출판사"
                  placeholder="출판사를 입력하세요"
                  fullWidth
                  size="small"
                  sx={inputStyle}
                />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography
                      variant="caption"
                      component="label"
                      htmlFor="publishDate"
                      sx={{
                        display: 'block',
                        mb: 0.8,
                        fontWeight: 700,
                        color: '#172033',
                      }}
                    >
                      출판일
                    </Typography>
                    <TextField
                      id="publishDate"
                      type="date"
                      fullWidth
                      size="small"
                      sx={inputStyle}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl size="small" fullWidth sx={inputStyle}>
                      <InputLabel>장르</InputLabel>
                      <Select label="장르" defaultValue="">
                        <MenuItem value="">장르를 선택하세요</MenuItem>
                        <MenuItem value="소설">소설</MenuItem>
                        <MenuItem value="에세이">에세이</MenuItem>
                        <MenuItem value="자기계발">자기계발</MenuItem>
                        <MenuItem value="베스트셀러">베스트셀러</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <TextField
                  label="책 소개"
                  placeholder="책 소개 내용을 입력하세요"
                  multiline
                  minRows={6}
                  fullWidth
                  size="small"
                  sx={inputStyle}
                />
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <AiCoverPanel />
          </Grid>
        </Grid>

        <Stack
          direction="row"
          spacing={1.5}
          sx={{ justifyContent: 'flex-end', mt: 4 }}
        >
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 700,
            }}
          >
            취소
          </Button>
          <Button
            variant="contained"
            onClick={onSubmit}
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
            }}
          >
            저장하기
          </Button>
        </Stack>
      </Box>
    </Container>
  </Box>
);
}

export default BookFormPage;
