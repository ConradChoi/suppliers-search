import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  IconButton,
  Link,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';
import CallIcon from '@mui/icons-material/Call';

interface SupplierCardProps {
  supplier: {
    id: string;
    image: string;
    category: string;
    companyName: string;
    businessNumber: string;
    ceoName: string;
    zone1: string;
    zone2: string;
    phone: string;
    website: string;
    rating: number;
    likes: number;
    isLiked: boolean;
  };
  viewMode: 'gallery' | 'list';
  onLikeClick: (id: string) => void;
}

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier, viewMode, onLikeClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    id,
    image,
    category,
    companyName,
    zone1,
    zone2,
    phone,
    website,
    rating,
    isLiked,
  } = supplier;

  if (viewMode === 'list') {
    return (
      <Card sx={{ display: 'flex', mb: 2, width: '100%' }}>
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image={image}
          alt={companyName}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  {category}
                </Typography>
                <Typography variant="h6" component="div">
                  {companyName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {zone1} {zone2}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{phone}</Typography>
                  </Box>
                  <Link href={website} target="_blank" sx={{ display: 'flex', alignItems: 'center' }}>
                    <LanguageIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">홈페이지</Typography>
                  </Link>
                </Stack>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Rating value={rating} precision={0.5} readOnly size="small" />
                <IconButton onClick={() => onLikeClick(id)} color="primary">
                  {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={companyName}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          {category}
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          {companyName}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {zone1} {zone2}
        </Typography>
        {!isMobile && (
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">{phone}</Typography>
            </Box>
            <Link href={website} target="_blank" sx={{ display: 'flex', alignItems: 'center' }}>
              <LanguageIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">홈페이지</Typography>
            </Link>
          </Stack>
        )}
        {isMobile ? (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, gap: 1 }}>
            <IconButton
              href={`tel:${phone}`}
              color="primary"
              size="small"
              sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              <CallIcon />
            </IconButton>
            <IconButton
              href={website}
              target="_blank"
              color="primary"
              size="small"
              sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              <LanguageIcon />
            </IconButton>
            <IconButton onClick={() => onLikeClick(id)} color="primary" size="small">
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 56, textAlign: 'right' }}>
              {rating.toFixed(1)}/5.0
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Rating value={rating} precision={0.5} readOnly size="small" />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={() => onLikeClick(id)} color="primary" size="small">
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default SupplierCard; 