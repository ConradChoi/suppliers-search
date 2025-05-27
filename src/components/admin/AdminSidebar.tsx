import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  Category as CategoryIcon,
  Forum as ForumIcon,
  People as PeopleIcon,
  Search as SearchIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Article as ArticleIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Code as CodeIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: '대시보드',
    icon: <DashboardIcon />,
    path: '/admin/dashboard',
  },
  {
    id: 'suppliers',
    title: '업체 관리',
    icon: <BusinessIcon />,
    path: '/admin/suppliers',
  },
  {
    id: 'categories',
    title: '품목 카테고리 관리',
    icon: <CategoryIcon />,
    path: '/admin/categories',
  },
  {
    id: 'boards',
    title: '게시판 관리',
    icon: <ForumIcon />,
    children: [
      {
        id: 'free-board',
        title: '자유게시판 관리',
        icon: <ArticleIcon />,
        path: '/admin/boards/free',
      },
      {
        id: 'notice',
        title: '공지사항 관리',
        icon: <ArticleIcon />,
        path: '/admin/boards/notice',
      },
      {
        id: 'faq',
        title: 'FAQ 관리',
        icon: <ArticleIcon />,
        path: '/admin/boards/faq',
      },
      {
        id: 'inquiry',
        title: '문의 관리',
        icon: <ArticleIcon />,
        path: '/admin/boards/inquiry',
      },
    ],
  },
  {
    id: 'members',
    title: '회원 관리',
    icon: <PeopleIcon />,
    children: [
      {
        id: 'active-members',
        title: '회원 관리',
        icon: <PeopleIcon />,
        path: '/admin/members/active',
      },
      {
        id: 'withdrawn-members',
        title: '탈퇴 회원',
        icon: <PeopleIcon />,
        path: '/admin/members/withdrawn',
      },
    ],
  },
  {
    id: 'search',
    title: '검색어 관리',
    icon: <SearchIcon />,
    path: '/admin/search',
  },
  {
    id: 'statistics',
    title: '통계',
    icon: <BarChartIcon />,
    path: '/admin/statistics',
  },
  {
    id: 'settings',
    title: '설정',
    icon: <SettingsIcon />,
    children: [
      {
        id: 'admins',
        title: '관리자 관리',
        icon: <PeopleIcon />,
        path: '/admin/settings/admins',
      },
      {
        id: 'permissions',
        title: '권한 관리',
        icon: <SecurityIcon />,
        path: '/admin/settings/permissions',
      },
      {
        id: 'common-codes',
        title: '공통 코드 관리',
        icon: <CodeIcon />,
        path: '/admin/settings/common-codes',
      },
      {
        id: 'notifications',
        title: '알림 관리',
        icon: <NotificationsIcon />,
        path: '/admin/settings/notifications',
      },
      {
        id: 'logs',
        title: '로그 관리',
        icon: <HistoryIcon />,
        path: '/admin/settings/logs',
      },
    ],
  },
];

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const handleMenuClick = (item: MenuItem) => {
    if (item.children) {
      setOpenMenus((prev) => ({
        ...prev,
        [item.id]: !prev[item.id],
      }));
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isOpen = openMenus[item.id];
    const isActive = item.path === location.pathname;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <React.Fragment key={item.id}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleMenuClick(item)}
            sx={{
              pl: level * 2 + 2,
              bgcolor: isActive ? 'action.selected' : 'transparent',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'primary.main' : 'text.primary',
                  }}
                >
                  {item.title}
                </Typography>
              }
            />
            {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map((child) => renderMenuItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          관리자 메뉴
        </Typography>
      </Box>
      <Divider />
      <List component="nav" sx={{ pt: 1 }}>
        {menuItems.map((item) => renderMenuItem(item))}
      </List>
    </Box>
  );
};

export default AdminSidebar; 