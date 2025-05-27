import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Collapse,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// FAQ 카테고리 및 데이터
const FAQ_CATEGORIES = [
  { id: 'general', name: '일반' },
  { id: 'account', name: '계정' },
  { id: 'service', name: '서비스 이용' },
  { id: 'payment', name: '결제' },
  { id: 'support', name: '기술지원' },
];

const FAQ_DATA = {
  general: [
    {
      question: 'YLIA는 어떤 서비스인가요?',
      answer: 'YLIA는 공급사 검색 및 정보 제공, 게시판, 문의 등 다양한 커뮤니티 서비스를 제공하는 플랫폼입니다.',
    },
    {
      question: '서비스 이용 시간은 어떻게 되나요?',
      answer: '서비스는 연중무휴 24시간 이용 가능합니다. 다만, 시스템 점검 등으로 인한 일시적인 서비스 중단이 있을 수 있습니다.',
    },
  ],
  account: [
    {
      question: '회원가입은 어떻게 하나요?',
      answer: '홈페이지 우측 상단의 회원가입 버튼을 클릭하여 이메일 인증 후 가입이 가능합니다.',
    },
    {
      question: '비밀번호를 잊어버렸어요.',
      answer: '로그인 페이지의 "비밀번호 찾기" 링크를 통해 이메일 인증 후 비밀번호를 재설정할 수 있습니다.',
    },
  ],
  service: [
    {
      question: '공급사 검색은 어떻게 하나요?',
      answer: '메인 페이지의 검색창을 통해 원하는 키워드로 검색하거나, 카테고리별로 필터링하여 검색할 수 있습니다.',
    },
    {
      question: '게시판 이용 방법을 알려주세요.',
      answer: '상단 메뉴의 "Board"를 클릭하여 게시판에 접근할 수 있습니다. 글쓰기, 수정, 삭제 등의 기능을 이용할 수 있습니다.',
    },
  ],
  payment: [
    {
      question: '결제 방법은 어떤 것이 있나요?',
      answer: '신용카드, 계좌이체, 가상계좌 등 다양한 결제 방법을 제공합니다.',
    },
    {
      question: '환불 정책은 어떻게 되나요?',
      answer: '서비스 이용 시작일로부터 7일 이내 환불이 가능합니다. 자세한 내용은 고객센터로 문의해 주세요.',
    },
  ],
  support: [
    {
      question: '서비스 이용 중 오류가 발생했어요.',
      answer: '고객센터로 문의해 주시면 빠른 시일 내에 답변 드리도록 하겠습니다.',
    },
    {
      question: '모바일에서도 이용 가능한가요?',
      answer: '네, 모바일 웹을 통해 모든 서비스를 이용하실 수 있습니다.',
    },
  ],
};

const FAQPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [expandedFAQ, setExpandedFAQ] = useState<string | false>(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setExpandedFAQ(false);
  };

  const handleFAQChange = (faqId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedFAQ(isExpanded ? faqId : false);
  };

  const getFAQsToShow = () => {
    if (selectedCategory === 'all') {
      return FAQ_CATEGORIES.filter(cat => cat.id !== 'all').map(category => ({
        category: category.name,
        faqs: FAQ_DATA[category.id as keyof typeof FAQ_DATA]
      }));
    }
    return [{
      category: FAQ_CATEGORIES.find(cat => cat.id === selectedCategory)?.name || '',
      faqs: FAQ_DATA[selectedCategory as keyof typeof FAQ_DATA]
    }];
  };

  const renderFAQContent = (categoryData: { category: string; faqs: typeof FAQ_DATA[keyof typeof FAQ_DATA] }, categoryIndex: number) => {
    if (isMobile) {
      return (
        <Box key={categoryIndex} sx={{ mb: 4 }}>
          {selectedCategory === 'all' && (
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
              {categoryData.category}
            </Typography>
          )}
          {categoryData.faqs.map((faq, index) => (
            <Card 
              key={`${categoryIndex}-${index}`}
              sx={{ 
                mb: 2,
                boxShadow: expandedFAQ === `faq-${categoryIndex}-${index}` ? 3 : 1,
                transition: 'all 0.3s ease',
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box 
                  onClick={() => handleFAQChange(`faq-${categoryIndex}-${index}`)({} as React.SyntheticEvent, expandedFAQ !== `faq-${categoryIndex}-${index}`)}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Typography sx={{ fontWeight: 600, flex: 1 }}>
                    {faq.question}
                  </Typography>
                  <IconButton size="small">
                    <ExpandMoreIcon 
                      sx={{ 
                        transform: expandedFAQ === `faq-${categoryIndex}-${index}` ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                      }} 
                    />
                  </IconButton>
                </Box>
                <Collapse in={expandedFAQ === `faq-${categoryIndex}-${index}`}>
                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Typography color="text.secondary">{faq.answer}</Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          ))}
        </Box>
      );
    }

    return (
      <Box key={categoryIndex} sx={{ mb: 4 }}>
        {selectedCategory === 'all' && (
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
            {categoryData.category}
          </Typography>
        )}
        {categoryData.faqs.map((faq, index) => (
          <Accordion
            key={`${categoryIndex}-${index}`}
            expanded={expandedFAQ === `faq-${categoryIndex}-${index}`}
            onChange={handleFAQChange(`faq-${categoryIndex}-${index}`)}
            sx={{ mb: 1 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };

  return (
    <Container disableGutters sx={{ py: 4 }}>
      {isMobile ? (
        <Box sx={{ mb: 2 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                카테고리
              </Typography>
              <IconButton onClick={() => setMobileCategoryOpen((v) => !v)}>
                {mobileCategoryOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
            <Collapse in={mobileCategoryOpen}>
              <List>
                {FAQ_CATEGORIES.map((category) => (
                  <ListItem key={category.id} disablePadding>
                    <ListItemButton
                      selected={selectedCategory === category.id}
                      onClick={() => {
                        handleCategoryChange(category.id);
                        setMobileCategoryOpen(false);
                      }}
                      sx={{
                        borderRadius: 1,
                        '&.Mui-selected': {
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          },
                        },
                      }}
                    >
                      <ListItemText primary={category.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
              {FAQ_CATEGORIES.find((cat) => cat.id === selectedCategory)?.name} FAQ
            </Typography>
            <Box>
              {getFAQsToShow().map(renderFAQContent)}
            </Box>
          </Paper>
        </Box>
      ) : (
        <Grid container spacing={0}>
          {/* Left Side - Categories */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, height: '100%', mr: { md: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
                  카테고리
                </Typography>
              </Box>
              <List>
                {FAQ_CATEGORIES.map((category) => (
                  <ListItem key={category.id} disablePadding>
                    <ListItemButton
                      selected={selectedCategory === category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      sx={{
                        borderRadius: 1,
                        '&.Mui-selected': {
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          },
                        },
                      }}
                    >
                      <ListItemText primary={category.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Right Side - FAQ List */}
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                {FAQ_CATEGORIES.find((cat) => cat.id === selectedCategory)?.name} FAQ
              </Typography>
              <Box>
                {getFAQsToShow().map(renderFAQContent)}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default FAQPage; 