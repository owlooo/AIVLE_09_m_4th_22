import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import KeyIcon from '@mui/icons-material/Key';
import ImageIcon from '@mui/icons-material/Image';

function AiCoverPanel() {
  return (
    <Stack spacing={2}>
      {/* AI 표지 자동 생성 영역 */}
      <Paper
        variant="outlined"
        sx={{
          p: 2.5,
          borderColor: 'primary.light',
          backgroundColor: 'rgba(25, 118, 210, 0.04)',
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
          <AutoAwesomeIcon color="primary" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            [AI] 표지 자동 생성
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          OpenAI DALL·E로 표지 이미지를 자동 생성합니다
        </Typography>

        {/* 미리보기 영역 */}
        <Box
          sx={{
            mt: 2,
            width: '100%',
            aspectRatio: '4 / 3',
            bgcolor: 'background.paper',
            border: '1px dashed',
            borderColor: 'grey.400',
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'grey.500',
          }}
        >
          <ImageIcon fontSize="large" />
          <Typography variant="body2">생성된 표지 미리보기</Typography>
        </Box>

        {/* 입력 필드들 */}
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="키워드"
            placeholder="예: 우주, 모험, 푸른 색감"
            size="small"
            fullWidth
          />

          <FormControl size="small" fullWidth>
            <InputLabel>스타일</InputLabel>
            <Select label="스타일" defaultValue="">
              <MenuItem value="">선택하세요</MenuItem>
              <MenuItem value="watercolor">수채화</MenuItem>
              <MenuItem value="oil">유화</MenuItem>
              <MenuItem value="digital">디지털 아트</MenuItem>
              <MenuItem value="minimal">미니멀</MenuItem>
              <MenuItem value="vintage">빈티지</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<AutoAwesomeIcon />}
            fullWidth
          >
            AI 표지 생성하기
          </Button>

          <Typography variant="caption" color="text.secondary">
            ※ 로딩(스피너) / 에러 메시지 / 성공 상태를 모두 디자인
          </Typography>
        </Stack>
      </Paper>

      {/* API Key 입력 영역 */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderColor: 'warning.light',
          backgroundColor: 'rgba(255, 152, 0, 0.04)',
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
          <KeyIcon color="warning" fontSize="small" />
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            [KEY] OpenAI API Key
          </Typography>
        </Stack>
        <TextField
          type="password"
          placeholder="sk-..."
          size="small"
          fullWidth
        />
      </Paper>
    </Stack>
  );
}

export default AiCoverPanel;
