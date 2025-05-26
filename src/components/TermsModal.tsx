import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

const TERMS_TEXT = `
제1조(목적)
이 약관은 YLIA(이하 "회사"라 함)가 제공하는 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조(정의)
1. "서비스"란 회사가 제공하는 모든 온라인 서비스를 의미합니다.
2. "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.

제3조(약관의 효력 및 변경)
1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.
2. 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.

제4조(서비스의 제공 및 변경)
1. 회사는 이용자에게 아래와 같은 서비스를 제공합니다.
  1) 공급사 검색 및 정보 제공 서비스
  2) 게시판, 문의 등 커뮤니티 서비스
  3) 기타 회사가 정하는 서비스
2. 회사는 서비스의 내용을 변경할 수 있으며, 변경 시 사전 공지합니다.

제5조(서비스의 이용)
1. 서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을 원칙으로 합니다.
2. 회사는 서비스의 일부 또는 전부를 회사의 정책 및 운영의 필요상 수정, 중단, 변경할 수 있습니다.

제6조(이용자의 의무)
1. 이용자는 관련 법령, 본 약관의 규정, 이용안내 및 서비스와 관련하여 공지한 주의사항, 회사가 통지하는 사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안 됩니다.
2. 이용자는 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안 됩니다.
  1) 신청 또는 변경 시 허위내용의 등록
  2) 타인의 정보도용
  3) 회사가 게시한 정보의 변경
  4) 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시
  5) 회사 및 기타 제3자의 저작권 등 권리를 침해하는 행위
  6) 회사 및 기타 제3자에 대한 비방, 명예훼손, 업무방해 행위
  7) 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위
  8) 기타 불법적이거나 부당한 행위

제7조(면책조항)
1. 회사는 천재지변, 불가항력적 사유, 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.
2. 회사는 이용자가 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등에 대하여는 책임을 지지 않습니다.

제8조(분쟁의 해결)
1. 회사와 이용자 간에 발생한 분쟁에 관한 소송은 회사의 본사 소재지를 관할하는 법원을 제1심 관할법원으로 합니다.

부칙
본 약관은 2024년 6월 1일부터 시행합니다.
`;

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '80vh',
          maxHeight: '80vh',
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          이용약관
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ whiteSpace: 'pre-line', fontSize: 16, color: 'text.secondary' }}>
          {TERMS_TEXT}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsModal; 