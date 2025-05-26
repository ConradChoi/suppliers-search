import React, { useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, IconButton, Button, Menu, Stack, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

const menuItems = [
  { label: 'About', icon: <InfoOutlinedIcon fontSize="large" color="primary" />, link: '/about' },
  { label: 'Suppliers', icon: <StorefrontOutlinedIcon fontSize="large" color="primary" />, link: '/suppliers' },
  { label: 'Items', icon: <Inventory2OutlinedIcon fontSize="large" color="primary" />, link: '/items' },
  { label: 'Board', icon: <ForumOutlinedIcon fontSize="large" color="primary" />, link: '/board' },
];

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const isMain = location.pathname === '/';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: '100%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2, px: { xs: 2, sm: 4 }, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Left: Logo/Title (hide on main) */}
      {!isMain && (
        <Typography
          variant="h5"
          component={RouterLink}
          to="/"
          sx={{ fontWeight: 700, color: '#4285f4', letterSpacing: 1, textDecoration: 'none', cursor: 'pointer' }}
        >
          {isMobile ? 'SS' : 'Suppliers Search'}
        </Typography>
      )}
      <Box sx={{ flex: 1 }} />
      {/* Right: Menu Icon & Login */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={handleMenuOpen} size="large" color="primary">
          <MenuIcon fontSize="large" />
        </IconButton>
        <Button
          variant="outlined"
          color="primary"
          sx={{ ml: 1, borderRadius: '20px', px: 3, fontWeight: 600 }}
        >
          로그인
        </Button>
      </Box>
      {/* Menu Popup */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ px: 2, py: 1, width: 260 }}>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            {menuItems.map((item) => (
              <Box key={item.label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 44 }}>
                <IconButton component={RouterLink} to={item.link} onClick={handleMenuClose} color="primary">
                  {item.icon}
                </IconButton>
                <Typography variant="caption" sx={{ mt: 0.5 }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Menu>
    </Box>
  );
};

export default Header; 