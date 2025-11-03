# Shared Layer

재사용 가능한 공통 코드

## 구조
- `ui/` - 공통 UI 컴포넌트 (Button, Input 등)
- `lib/` - 유틸리티 함수, 헬퍼
- `api/` - API 클라이언트 설정
- `config/` - 환경 설정
- `types/` - 공통 타입 정의
- `assets/` - 이미지, 폰트 등 정적 파일

## 의존성 규칙
- 의존 불가능: 모든 상위 레이어
- 다른 shared 모듈에만 의존 가능
