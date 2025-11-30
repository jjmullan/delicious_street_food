---
description: FSD 아키텍처 규칙을 검증하고 위반 사항을 점검합니다
---

# FSD 아키텍처 점검 작업

프로젝트의 폴더 구조와 import 의존성이 FSD(Feature Sliced Design) 아키텍처 규칙을 준수하는지 점검해주세요.

## 점검 항목

### 1. 폴더 구조 검증
- src/ 하위에 올바른 레이어 폴더들이 존재하는지 확인
  - app/ (애플리케이션 전역 설정)
  - pages/ (라우팅과 페이지 구성)
  - widgets/ (독립적인 UI 블록)
  - features/ (비즈니스 로직이 있는 기능)
  - entities/ (비즈니스 엔티티)
  - shared/ (재사용 가능한 코드)
- FSD 레이어가 아닌 폴더가 src/ 직하위에 있는지 확인

### 2. Slice 구조 검증
각 레이어(pages, widgets, features, entities) 내부의 slice들이:
- 적절한 세그먼트 구조를 가지는지 (ui/, model/, api/, lib/, types/ 등)
- index.ts(x)를 통한 public API를 제공하는지

### 3. Import 의존성 규칙 검증
모든 .ts, .tsx 파일에서:
- 상위 레이어가 하위 레이어만 import하는지
  - 레이어 순서: shared < entities < features < widgets < pages < app
  - 예: features는 entities, shared만 import 가능
  - 예: pages는 widgets, features, entities, shared를 import 가능
- 같은 레이어끼리 cross-import가 없는지
  - 예: features/auth가 features/user를 import하면 안 됨
- shared 레이어는 다른 레이어를 import하지 않는지

### 4. 파일 배치 적절성 검증
- 비즈니스 로직이 features에 있는지
- UI 컴포넌트만 있는 것은 shared/ui나 widgets에 있는지
- API 호출 관련 코드가 shared/api나 각 slice의 api/에 있는지
- 전역 설정이 app에 있는지

## 작업 순서

1. `find src -type f \( -name "*.ts" -o -name "*.tsx" \)` 명령어로 모든 TypeScript 파일 목록 확인
2. src/ 직하위 폴더 구조를 확인하고, FSD 레이어가 아닌 폴더가 있는지 검증
3. 각 파일의 import 문을 분석하여 의존성 규칙 위반 사항 확인
4. 발견된 문제점을 카테고리별로 분류

## 출력 형식

검증 결과를 다음과 같이 카테고리별로 정리하여 출력:

### ✅ FSD 아키텍처 준수 현황

#### 📁 폴더 구조
- [정상/문제점] src/ 하위 레이어 구조 상태
- [문제가 있다면] FSD 레이어가 아닌 폴더 목록

#### 🔗 Import 의존성 규칙 위반
- [파일 경로]: 위반 내용 (예: features가 pages를 import)
- 위반 건수 총합

#### 🚨 같은 레이어 간 Cross-Import
- [파일 경로]: 같은 레이어의 어떤 slice를 import하는지
- 위반 건수 총합

#### 📦 파일 배치 이슈
- [파일 경로]: 어떤 레이어로 이동해야 하는지와 이유

#### 📊 종합 점수
- 전체 파일 수: X개
- 문제가 있는 파일 수: Y개
- 준수율: Z%

## 주의사항

- 별도의 파일을 생성하지 말고, 터미널에 결과를 바로 출력
- node_modules, dist, build 등 빌드 결과물은 검사 제외
- 문제가 없는 경우에도 "✅ FSD 아키텍처를 잘 준수하고 있습니다" 메시지 출력
- 각 위반 사항에 대해 구체적인 파일명과 라인 번호 제공
- 심각도 표시: 🚨 Critical (반드시 수정), ⚠️ Warning (권장 수정)
