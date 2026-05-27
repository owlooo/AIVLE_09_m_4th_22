import { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  IconButton,
  Switch,
  Box,
  Divider,
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import CloseIcon from '@mui/icons-material/Close';

function AiCoverPanel({ onGenerate, onClose }) {
  // 컨트롤드 상태들
  const [extraKeyword, setExtraKeyword] = useState('');
  const [style, setStyle] = useState('수채화');
  const [customStyle, setCustomStyle] = useState('');
  const [styleOpen, setStyleOpen] = useState(false);
  const [colorTone, setColorTone] = useState('자동');
  const [customColorTone, setCustomColorTone] = useState('');
  const [colorToneOpen, setColorToneOpen] = useState(false);
  const [quality, setQuality] = useState('medium');
  const [includeTitle, setIncludeTitle] = useState(false);

  return (
    <Stack spacing={2}>
      {/* AI 표지 자동 생성 영역 */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderColor: 'primary.light',
          backgroundColor: 'rgba(25, 118, 210, 0.04)',
        }}
      >
        {/* 헤더 */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700, flexGrow: 1 }}>
            AI 표지 자동 생성
          </Typography>
          {onClose && (
            <IconButton
              size="small"
              onClick={onClose}
              aria-label="닫기"
              sx={{ ml: 'auto' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block' }}
        >
          이 책의 제목·책 소개·장르를 기반으로 OpenAI가 표지를 생성합니다.
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block' }}
        >
          아래에 추가 기능을 입력하세요.
        </Typography>

        <Stack spacing={1.5} sx={{ mt: 2 }}>
          {/* 추가 키워드 input */}
          <TextField
            label="추가 키워드 (선택)"
            placeholder="예: 푸른 색감, 가을 분위기"
            size="small"
            fullWidth
            value={extraKeyword}
            onChange={(e) => setExtraKeyword(e.target.value)}
          />

          {/* 스타일 + 색감 (2-column) */}
          <Stack direction="row" spacing={1}>
            <FormControl size="small" fullWidth>
              <InputLabel>스타일</InputLabel>
              <Select
                label="스타일"
                value={style}
                open={styleOpen}
                onOpen={() => setStyleOpen(true)}
                onClose={() => setStyleOpen(false)}
                onChange={(e) => {
                  setStyle(e.target.value);
                  setCustomStyle('');
                }}
                MenuProps={{
                  autoFocus: false,
                  disableAutoFocusItem: true,
                }}
                renderValue={(val) => {
                  if (customStyle) return `직접 입력: ${customStyle}`;
                  if (val === '디지털아트') return '디지털 아트';
                  return val;
                }}
              >
                <MenuItem value="일러스트">일러스트</MenuItem>
                <MenuItem value="수채화">수채화</MenuItem>
                <MenuItem value="디지털아트">디지털 아트</MenuItem>
                <MenuItem value="미니멀">미니멀</MenuItem>
                <MenuItem value="사진">사진</MenuItem>
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
                    placeholder="예: 콜라주"
                    value={customStyle}
                    onChange={(e) => setCustomStyle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        setTimeout(() => setStyleOpen(false), 0);
                      }
                    }}
                    autoComplete="off"
                  />
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStyleOpen(false);
                    }}
                    sx={{ flexShrink: 0 }}
                  >
                    적용
                  </Button>
                </Box>
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>색감</InputLabel>
              <Select
                label="색감"
                value={colorTone}
                open={colorToneOpen}
                onOpen={() => setColorToneOpen(true)}
                onClose={() => setColorToneOpen(false)}
                onChange={(e) => {
                  setColorTone(e.target.value);
                  setCustomColorTone('');
                }}
                MenuProps={{
                  autoFocus: false,
                  disableAutoFocusItem: true,
                }}
                renderValue={(val) => {
                  if (customColorTone) return `직접 입력: ${customColorTone}`;
                  return val;
                }}
              >
                <MenuItem value="자동">자동</MenuItem>
                <MenuItem value="따뜻한 톤">따뜻한 톤</MenuItem>
                <MenuItem value="푸른 톤">푸른 톤</MenuItem>
                <MenuItem value="파스텔">파스텔</MenuItem>
                <MenuItem value="비비드">비비드</MenuItem>
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
                    placeholder="예: 청록색 위주"
                    value={customColorTone}
                    onChange={(e) => setCustomColorTone(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        setTimeout(() => setColorToneOpen(false), 0);
                      }
                    }}
                    autoComplete="off"
                  />
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      setColorToneOpen(false);
                    }}
                    sx={{ flexShrink: 0 }}
                  >
                    적용
                  </Button>
                </Box>
              </Select>
            </FormControl>
          </Stack>

          {/* 품질 */}
          <FormControl size="small" fullWidth>
            <InputLabel>품질</InputLabel>
            <Select
              label="품질"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
            >
              <MenuItem value="low">저품질</MenuItem>
              <MenuItem value="medium">표준</MenuItem>
              <MenuItem value="high">고품질</MenuItem>
              <MenuItem value="auto">자동</MenuItem>
            </Select>
          </FormControl>

          {/* 표지에 제목 텍스트 포함 토글 */}
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Switch
              size="small"
              checked={includeTitle}
              onChange={(e) => setIncludeTitle(e.target.checked)}
            />
            <Typography variant="body2">
              표지에 제목 텍스트 포함
              <Typography
                component="span"
                variant="caption"
                color="text.secondary"
                sx={{ ml: 0.5 }}
              >
                (한글은 깨질 수 있음)
              </Typography>
            </Typography>
          </Stack>

          {/* 생성하기 버튼 */}
          <Button
            variant="contained"
            fullWidth
            onClick={onGenerate}
          >
            AI 표지 생성하기
          </Button>
        </Stack>
      </Paper>

      {/* API Key 입력 영역 */}
      <Paper
        variant="outlined"
        sx={{
          p: 1.5,
          borderColor: 'warning.light',
          backgroundColor: 'rgba(255, 152, 0, 0.04)',
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', mb: 1 }}
        >
          <KeyIcon color="warning" fontSize="small" />
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            OpenAI API Key
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
