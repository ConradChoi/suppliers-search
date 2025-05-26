import React, { useState } from 'react';
import { Container, Paper, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const PRIVACY_VERSIONS = [
  { version: 'v1.0', date: '2024-06-01' },
  { version: 'v0.9', date: '2024-05-01' },
  { version: 'v0.8', date: '2024-04-01' },
];

const PRIVACY_DATA = {
  'v1.0': `
제1조(개인정보의 처리 목적)
YLIA(이하 "회사"라 함)는 다음의 목적을 위하여 개인정보를 처리합니다. 처리한 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며, 이용 목적이 변경될 시에는 사전 동의를 구할 예정입니다.
1. 서비스 제공 및 회원관리
2. 문의 및 민원처리, 공지사항 전달
3. 서비스 개선 및 신규 서비스 개발

제2조(개인정보의 처리 및 보유 기간)
회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.

제3조(처리하는 개인정보 항목)
회사는 다음의 개인정보 항목을 처리하고 있습니다.
1. 필수항목: 이메일, 비밀번호, 이름
2. 선택항목: 연락처, 회사명 등

제4조(개인정보의 제3자 제공)
회사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.

제5조(개인정보처리의 위탁)
회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁할 수 있습니다. (현재 위탁사항 없음)

제6조(정보주체의 권리·의무 및 행사방법)
이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
1. 개인정보 열람요구
2. 오류 등이 있을 경우 정정 요구
3. 삭제요구
4. 처리정지 요구

제7조(개인정보의 파기)
회사는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체 없이 해당 개인정보를 파기합니다.

제8조(개인정보의 안전성 확보 조치)
회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
1. 관리적 조치: 내부관리계획 수립·시행, 임직원 교육 등
2. 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 암호화, 보안프로그램 설치 등
3. 물리적 조치: 전산실, 자료보관실 등의 접근통제 등

제9조(개인정보 보호책임자)
회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
- 책임자: 홍길동
- 연락처: privacy@ylia.info

부칙
본 방침은 2024년 6월 1일부터 시행합니다.
`,
  'v0.9': `
[이전 버전의 개인정보처리방침 내용]
...
`,
  'v0.8': `
[이전 버전의 개인정보처리방침 내용]
...
`,
};

const PrivacyPage: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState(PRIVACY_VERSIONS[0].version);

  const handleVersionChange = (event: any) => {
    setSelectedVersion(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            개인정보처리방침
          </Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="version-select-label">버전</InputLabel>
            <Select
              labelId="version-select-label"
              value={selectedVersion}
              label="버전"
              onChange={handleVersionChange}
            >
              {PRIVACY_VERSIONS.map((version) => (
                <MenuItem key={version.version} value={version.version}>
                  {version.version} ({version.date})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ whiteSpace: 'pre-line', fontSize: 16, color: 'text.secondary' }}>
          {PRIVACY_DATA[selectedVersion as keyof typeof PRIVACY_DATA]}
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPage; 