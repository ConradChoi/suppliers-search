import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Container,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Category as CategoryIcon,
  Forum as ForumIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  ExpandLess,
  ExpandMore,
  Logout as LogoutIcon,
  AccountCircle,
  Notifications as NotificationsIcon,
  Edit as EditIcon,
  Code as CodeIcon,
  History as HistoryIcon,
  SupervisorAccount as SupervisorAccountIcon,
  AssignmentInd as AssignmentIndIcon,
  VpnKey as VpnKeyIcon,
  QuestionAnswer as QuestionAnswerIcon,
  SpeakerNotes as SpeakerNotesIcon,
  Announcement as AnnouncementIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const miniDrawerWidth = 60;

// 메뉴 트리 구조 정의
const menuTree = [
  {
    id: 'dashboard',
    text: '대시보드',
    icon: <DashboardIcon />,
  },
  {
    id: 'user',
    text: '사용자 관리',
    icon: <PeopleIcon />,
    children: [
      { id: 'user-normal', text: '일반회원', icon: <PeopleIcon /> },
      { id: 'user-leave', text: '탈퇴회원', icon: <PeopleIcon /> },
    ],
  },
  {
    id: 'company',
    text: '업체 관리',
    icon: <BusinessIcon />,
  },
  {
    id: 'category',
    text: '카테고리 관리',
    icon: <CategoryIcon />,
  },
  {
    id: 'board',
    text: '게시판 관리',
    icon: <ForumIcon />,
    children: [
      { id: 'board-inquiry', text: '문의 관리', icon: <QuestionAnswerIcon /> },
      { id: 'board-free', text: '자유게시판 관리', icon: <SpeakerNotesIcon /> },
      { id: 'board-notice', text: '공지사항 관리', icon: <AnnouncementIcon /> },
      { id: 'board-faq', text: 'FAQ 관리', icon: <StarIcon /> },
    ],
  },
  {
    id: 'search',
    text: '인기검색어 관리',
    icon: <SearchIcon />,
  },
  {
    id: 'stat',
    text: '통계',
    icon: <BarChartIcon />,
  },
  {
    id: 'setting',
    text: '설정',
    icon: <SettingsIcon />,
    children: [
      {
        id: 'setting-admin',
        text: '운영자 관리',
        icon: <SupervisorAccountIcon />,
        children: [
          { id: 'setting-admin-list', text: '운영자 관리', icon: <AssignmentIndIcon /> },
          { id: 'setting-admin-role', text: '권한 관리', icon: <VpnKeyIcon /> },
        ],
      },
      { id: 'setting-code', text: '공통 코드 관리', icon: <CodeIcon /> },
      { id: 'setting-alarm', text: '알림 관리', icon: <NotificationsIcon /> },
      {
        id: 'setting-terms',
        text: '약관 관리',
        icon: <EditIcon />,
        children: [
          { id: 'setting-terms-terms', text: '이용약관', icon: <EditIcon /> },
          { id: 'setting-terms-privacy', text: '개인정보처리방침', icon: <EditIcon /> },
        ],
      },
      { id: 'setting-log', text: '로그', icon: <HistoryIcon /> },
    ],
  },
];

const AdminDashboardPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleEditProfile = () => {
    alert('정보수정 기능은 추후 구현됩니다.');
    handleClose();
  };

  // 메뉴 토글 핸들러
  const handleMenuClick = (id: string) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 메뉴 렌더 함수 (재귀, 미니모드 지원)
  const renderMenu = (items: any[], depth = 0) => (
    <List component="div" disablePadding>
      {items.map((item) => {
        const hasChildren = !!item.children;
        const isOpen = openMenus[item.id];
        return (
          <React.Fragment key={item.id}>
            <Tooltip title={!drawerOpen ? item.text : ''} placement="right" arrow>
              <ListItem
                button
                onClick={() => (hasChildren ? handleMenuClick(item.id) : undefined)}
                sx={{ pl: drawerOpen ? 2 + depth * 2 : 1, justifyContent: drawerOpen ? 'flex-start' : 'center' }}
              >
                <ListItemIcon sx={{ minWidth: 36, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
                {drawerOpen && <ListItemText primary={item.text} />}
                {hasChildren && drawerOpen && (isOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
            </Tooltip>
            {hasChildren && (
              <Collapse in={isOpen && drawerOpen} timeout="auto" unmountOnExit>
                {renderMenu(item.children, depth + 1)}
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );

  const drawer = (
    <div>
      <Toolbar>
        {drawerOpen ? (
          <Typography variant="h6" noWrap component="div">
            Admin
          </Typography>
        ) : (
          <Box sx={{ width: miniDrawerWidth, height: 40 }} />
        )}
      </Toolbar>
      <Divider />
      {renderMenu(menuTree)}
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: drawerOpen ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${miniDrawerWidth}px)` },
          ml: { sm: drawerOpen ? `${drawerWidth}px` : `${miniDrawerWidth}px` },
          transition: 'width 0.2s, margin 0.2s',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', pl: 0 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, position: 'absolute', left: 8 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEditProfile}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>정보수정</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>로그아웃</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? drawerWidth : miniDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? drawerWidth : miniDrawerWidth,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: 'width 0.2s',
          },
          display: { xs: 'none', sm: 'block' },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        open={!drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: drawerOpen ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${miniDrawerWidth}px)` },
          transition: 'width 0.2s',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Contents
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboardPage; 