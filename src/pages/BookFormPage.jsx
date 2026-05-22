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

function BookFormPage({ onAddClick, onBackClick, onCancel, onSubmit }) {
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
            mb: 1,
            color: 'primary.main',
            fontSize: '0.9rem',
          }}
        >
          <ArrowBackIcon fontSize="small" />
          목록으로
        </Link>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          새 도서 등록
        </Typography>

        <Grid container spacing={4}>
          {/* 왼쪽: 폼 영역 */}
          <Grid size={{ xs: 12, md: 7 }}>
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
                <Select label="장르" defaultValue="">
                  <MenuItem value="">선택하세요</MenuItem>
                  <MenuItem value="소설">소설</MenuItem>
                  <MenuItem value="에세이">에세이</MenuItem>
                  <MenuItem value="자기계발">자기계발</MenuItem>
                  <MenuItem value="베스트셀러">베스트셀러</MenuItem>
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
          </Grid>

          {/* 오른쪽: AI 표지 자동 생성 패널 */}
          <Grid size={{ xs: 12, md: 5 }}>
            <AiCoverPanel />
          </Grid>
        </Grid>

        {/* 하단: 취소 / 저장하기 */}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ justifyContent: 'flex-end', mt: 4 }}
        >
          <Button variant="outlined" onClick={onCancel}>
            취소
          </Button>
          <Button variant="contained" onClick={onSubmit}>
            저장하기
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default BookFormPage;
