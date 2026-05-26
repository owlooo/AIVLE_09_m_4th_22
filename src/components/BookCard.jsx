import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
  Chip,
  Box,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

function BookCard({ book, onClick }) {
  const { title, author, genres = [], coverImageUrl } = book;

  return (
  <Card
    elevation={0}
    sx={{
      height: '100%',
      borderRadius: 3,
      p: 2,
      boxShadow: '0 6px 18px rgba(15, 23, 42, 0.08)',
      transition: '0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 10px 24px rgba(15, 23, 42, 0.12)',
      },
    }}
  >
    <CardActionArea onClick={onClick} sx={{ height: '100%', borderRadius: 2 }}>
      <Box
        sx={{
          width: '100%',
          aspectRatio: '4 / 3',
          bgcolor: '#eef4ff',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9aa8bd',
        }}
      >
        {coverImageUrl ? (
          <Box
            component="img"
            src={coverImageUrl}
            alt={title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        ) : (
          <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
            <ImageIcon sx={{ fontSize: 34, color: '#a8b7d4' }} />
            <Typography variant="caption">표지</Typography>
          </Stack>
        )}
      </Box>

      <CardContent sx={{ px: 0, pb: '0 !important' }}>
        <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom noWrap>
          {author}
        </Typography>

        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {genres.map((genre) => (
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
      </CardContent>
    </CardActionArea>
  </Card>
);
}

export default BookCard;
