# FSD 아키텍처 리팩토링 실행 계획

> **작업 방식**: Bottom-up (shared → entities → features → widgets → pages → app)
> **예상 소요 시간**: 18-26시간
> **현재 FSD 준수율**: 74% → 목표: 95%+

## 전략 요약

### 사용자 결정사항
1. **작업 순서**: FSD 레이어 순서 (하위부터 상위로)
2. **Entities 구조**: UI 컴포넌트 모두 이동 → 순수 타입/모델만 남김
3. **Store 전략**:
   - `confirmModalStore`, `sessionStore` → `shared/model/`로 이동
   - 나머지 store들 → `features/*/model/`로 이동

### 주요 위반 사항
- **Shared Layer**: 2개 파일이 app/features 의존
- **Entities Layer**: 6개 UI 컴포넌트 (모두 widgets/pages로 이동 필요)
- **Features Layer**: 12건 cross-import, 17건 app store 의존
- **Widgets/Pages**: 12건 app store 의존
- **총 위반 건수**: 70건 이상

---

## Phase 1: Shared Layer 개선 (2-3시간)

### 목표
Shared layer의 app/features 의존성 제거 (전역 store를 shared로 이동)

### 작업 내용

#### 1-1. Store 이동
```bash
# 생성
src/shared/model/confirmModal.ts     # confirmModalStore 복사
src/shared/model/session.ts          # sessionStore 복사
src/shared/model/index.ts            # Public API
```

#### 1-2. Import 경로 업데이트 (18개 파일)
```typescript
// 변경 전
from '@app/store/confirmModalStore'
from '@app/store/sessionStore'

// 변경 후
from '@shared/model'
```

**영향받는 파일**:
- `src/shared/ui/modal/ConfirmModal.tsx`
- `src/shared/ui/button/HomeButton.tsx`
- `src/features/**/*.tsx` (8개 파일)
- `src/widgets/**/*.tsx` (9개 파일)
- `src/pages/review/ReviewCreatePage.tsx`

#### 검증
```bash
pnpm tsc --noEmit
pnpm build
grep -r "from '@app/store/confirmModalStore'" src/  # 결과 없어야 함
grep -r "from '@app/store/sessionStore'" src/       # 결과 없어야 함
```

---

## Phase 2: Entities Layer 재구성 (3-4시간)

### 목표
Entities의 모든 UI 컴포넌트를 widgets/pages로 이동, 순수 타입만 남김

### 작업 내용

#### 2-1. UI 컴포넌트 이동 (6개 파일)

| 현재 위치 | 이동 대상 | 우선순위 |
|----------|----------|---------|
| `entities/location/ui/LocationHome.tsx` | `pages/location/LocationHomePage.tsx` | Critical |
| `entities/user/ui/MyPage.tsx` | `pages/mypage/MyPageHomePage.tsx` | Critical |
| `entities/map/ui/GlobalMap.tsx` | `widgets/map/GlobalMap.tsx` | Critical |
| `entities/location/ui/LocationReviewAll.tsx` | `widgets/location/LocationReviewAll.tsx` | High |
| `entities/location/ui/LocationReviewPhoto.tsx` | `widgets/location/LocationReviewPhoto.tsx` | High |
| `entities/map/ui/LocationMap.tsx` | `widgets/map/LocationMap.tsx` | Medium |

#### 2-2. Import 경로 업데이트
각 파일 이동 후 해당 파일을 import하는 모든 파일의 경로 업데이트

```bash
# 영향받는 파일 찾기
grep -r "entities/location/ui/LocationHome" src/
grep -r "entities/user/ui/MyPage" src/
grep -r "entities/map/ui/GlobalMap" src/
```

#### 2-3. 순수 Entity 타입 생성

```bash
# 생성
src/entities/location/model/types.ts
src/entities/location/index.ts
src/entities/user/model/types.ts
src/entities/user/index.ts
src/entities/map/model/types.ts
src/entities/map/index.ts
src/entities/review/model/types.ts
src/entities/review/index.ts
src/entities/product/model/types.ts
src/entities/product/index.ts
```

**타입 예시**:
```typescript
// entities/location/model/types.ts
export interface LocationEntity {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
  created_at: string;
  updated_at: string;
}
```

#### 검증
```bash
find src/entities -name "*.tsx" -type f  # UI 컴포넌트 없어야 함
pnpm tsc --noEmit
pnpm build
```

---

## Phase 3: Features Layer 개선 (6-8시간)

### 목표
1. Feature 관련 store를 features/model로 이동
2. Cross-feature import 정리
3. Public API 구현

### 작업 내용

#### 3-1. Store 이동 (4개 store)

| Store | 현재 위치 | 이동 대상 | 영향 파일 수 |
|-------|----------|----------|------------|
| createLocationStore | `app/store/` | `features/location/model/` | 7 |
| locationStore | `app/store/` | `features/location/model/` | 4 |
| productFilterStore | `app/store/` | `features/product/model/` | 2 |
| createLocationModalStore | `app/store/` | `features/location/model/` | 3 |

#### 3-2. Import 경로 업데이트

```typescript
// 변경 전
from '@app/store/createLocationStore'
from '@app/store/locationStore'
from '@app/store/productFilterStore'

// 변경 후
from '@features/location/model/createLocationStore'
from '@features/location/model/locationStore'
from '@features/product/model/productFilterStore'
```

**영향받는 파일**:
- `src/shared/ui/button/HomeButton.tsx`
- `src/widgets/**/*.tsx` (다수)
- `src/features/**/*.tsx` (다수)

#### 3-3. Cross-Feature Import 처리

**문제 파일**: `features/location/ui/LocationInfoModal.tsx`
- favorite, product, review feature를 import

**전략**: 현재 상태 유지 (순환 의존성이 없으면 FSD에서 허용)
- 의존성 문서화
- 순환 참조 검증

#### 3-4. Public API 구현 (모든 features)

```bash
# 생성
src/features/auth/index.ts
src/features/location/index.ts
src/features/favorite/index.ts
src/features/user/index.ts
src/features/product/index.ts
src/features/review/index.ts
```

**Public API 예시**:
```typescript
// features/location/index.ts
export * from './model/createLocationStore';
export * from './model/locationStore';
export { default as useCreateLocation } from './hooks/useCreateLocation';
export { default as CreateLocationModal } from './ui/CreateLocationModal';
export type { AbbrLocation } from './types/location';
```

#### 3-5. Import 경로 전역 업데이트

```typescript
// 변경 전
from '@features/auth/ui/SignUp'
from '@features/location/hooks/useCreateLocation'

// 변경 후
from '@features/auth'
from '@features/location'
```

**영향 범위**: 50+ 파일

#### 3-6. 기존 app/store 파일 삭제

```bash
# 삭제 대상
src/app/store/confirmModalStore.ts
src/app/store/sessionStore.ts
src/app/store/createLocationStore.ts
src/app/store/locationStore.ts
src/app/store/productFilterStore.ts
src/app/store/createLocationModalStore.ts

# 검토 필요 (사용 여부 확인 후)
src/app/store/loginProviderStore.ts
```

#### 검증
```bash
grep -r "from '@app/store/" src/ | grep -v loginProviderStore  # 결과 없어야 함
grep -r "from '@features/.*/ui/" src/ | grep -v "src/features/"  # 최소화
pnpm tsc --noEmit
pnpm build
```

---

## Phase 4: Widgets Layer 개선 (2-3시간)

### 목표
Widgets Public API 구현 및 의존성 검증

### 작업 내용

#### 4-1. Public API 생성 (7개 디렉토리)

```bash
src/widgets/header/index.ts
src/widgets/layout/index.ts
src/widgets/aside/index.ts
src/widgets/nav/index.ts
src/widgets/footer/index.ts
src/widgets/location/index.ts      # Phase 2에서 생성된 디렉토리
src/widgets/map/index.ts           # Phase 2에서 생성된 디렉토리
```

#### 4-2. Import 경로 업데이트

```typescript
// 변경 전
from '@widgets/header/MapHeader'
from '@widgets/layout/MapLayout'

// 변경 후
from '@widgets/header'
from '@widgets/layout'
```

**영향받는 파일**: pages, app/routes

#### 검증
```bash
grep -r "from '@widgets/.*/.*\.tsx'" src/pages/
grep -r "from '@app/" src/widgets/ | grep -v provider  # app import 없어야 함
pnpm tsc --noEmit
pnpm build
```

---

## Phase 5: Pages Layer 개선 (2-3시간)

### 목표
Pages Public API 구현

### 작업 내용

#### 5-1. Public API 생성 (9개 디렉토리)

```bash
src/pages/home/index.ts
src/pages/location/index.ts
src/pages/mypage/home/index.ts
src/pages/mypage/favorite/index.ts
src/pages/mypage/review/index.ts
src/pages/review/index.ts
src/pages/signUp/index.ts
src/pages/signIn/index.ts
src/pages/error/index.ts
```

#### 5-2. Import 경로 업데이트

```typescript
// 변경 전
from '@pages/home/HomePage'
from '@pages/location/LocationHomePage'

// 변경 후
from '@pages/home'
from '@pages/location'
```

**영향받는 파일**: app/routes/\*.tsx

#### 검증
```bash
grep -r "from '@pages/.*/.*.tsx'" src/app/routes/
grep -r "from '@app/store" src/pages/
pnpm tsc --noEmit
pnpm build
```

---

## Phase 6: App Layer 정리 (1-2시간)

### 목표
App layer 최종 정리 및 검증

### 작업 내용

#### 6-1. Provider 업데이트

```bash
# 확인 및 업데이트
src/app/provider/SessionProvider.tsx
src/app/provider/ModalProvider.tsx
src/app/provider/LoginProviderProvider.tsx
src/app/provider/LocationProvider.tsx
```

모든 provider가 `@shared/model` 또는 `@features/*/model` 사용하는지 확인

#### 6-2. app/store 디렉토리 정리

```bash
# 디렉토리가 비었으면 삭제
ls -la src/app/store/
# (비어있으면) rmdir src/app/store
```

#### 검증
```bash
grep -r "from '@app/store/" src/ | grep -v "src/app/provider"
grep -r "from '@features/.*/ui/" src/app/
pnpm tsc --noEmit
pnpm build
```

---

## Phase 7: 최종 검증 및 문서화 (2-3시간)

### 목표
FSD 아키텍처 규칙 100% 준수 검증 및 문서화

### 검증 항목

#### 7-1. 의존성 규칙 검증

```bash
# Shared → 아무것도 import 불가
grep -r "from '@\(app\|pages\|widgets\|features\|entities\)/" src/shared/

# Entities → Shared만
grep -r "from '@\(app\|pages\|widgets\|features\)/" src/entities/

# Features → Entities, Shared만 (cross-feature는 문서화됨)
grep -r "from '@\(app\|pages\|widgets\)/" src/features/

# Widgets → Features, Entities, Shared만
grep -r "from '@\(app\|pages\)/" src/widgets/

# Pages → App provider/routes 제외하고 app import 없음
grep -r "from '@app/" src/pages/ | grep -v "from '@app/\(provider\|routes\)/"
```

#### 7-2. Public API 검증

```bash
# 내부 세그먼트 직접 import 최소화
grep -r "from '@features/.*/\(ui\|hooks\|api\)/" src/ | grep -v "src/features/"
grep -r "from '@widgets/.*/.*\.tsx'" src/ | grep -v "src/widgets/"
grep -r "from '@pages/.*/.*\.tsx'" src/ | grep -v "src/pages/"
```

#### 7-3. 순환 의존성 검증

```bash
# 주요 cross-feature 관계 확인
grep -r "from '@features/location'" src/features/favorite/
grep -r "from '@features/favorite'" src/features/location/
grep -r "from '@features/review'" src/features/location/
grep -r "from '@features/location'" src/features/review/
```

#### 7-4. 빌드 및 타입 검증

```bash
rm -rf dist/
pnpm build
pnpm tsc --noEmit
pnpm lint  # (있는 경우)
pnpm test  # (있는 경우)
```

#### 7-5. 수동 테스트

**주요 시나리오 테스트**:
1. ✓ 회원가입 / 로그인
2. ✓ 지도에서 장소 탐색
3. ✓ 새 장소 생성
4. ✓ 장소 상세 정보 보기
5. ✓ 즐겨찾기 추가/제거
6. ✓ 리뷰 작성
7. ✓ 사용자 프로필 보기
8. ✓ 로그아웃

#### 7-6. 문서 업데이트

```bash
# 업데이트 또는 생성
docs/fsd-architecture.md          # FSD 아키텍처 개요
fsd-refactor.md                   # 리팩토링 완료 보고서
```

---

## 중요 파일 목록

### 최우선 처리 (Phase 1-2)

1. **app/store/confirmModalStore.ts** → shared/model/
2. **app/store/sessionStore.ts** → shared/model/
3. **shared/ui/button/HomeButton.tsx** (3개 store 의존)
4. **entities/map/ui/GlobalMap.tsx** (11개 의존성)
5. **entities/location/ui/LocationHome.tsx** (9개 feature import)

### 복잡도 높음 (Phase 3)

6. **features/location/ui/LocationInfoModal.tsx** (4개 feature import)
7. **app/store/createLocationStore.ts** (7개 파일이 사용)
8. **app/store/locationStore.ts** (4개 파일이 사용)

---

## Git 전략

### 커밋 방식
각 Phase별로 작은 커밋 단위로 진행:

```bash
# Phase 1
git commit -m "[fsd] refactor(shared): Move confirmModal, session stores to shared/model"
git commit -m "[fsd] refactor(shared): Update 18 files to use shared/model"

# Phase 2
git commit -m "[fsd] refactor(entities): Move GlobalMap to widgets/map"
git commit -m "[fsd] refactor(entities): Move LocationHome to pages/location"
git commit -m "[fsd] refactor(entities): Create pure entity types"

# Phase 3
git commit -m "[fsd] refactor(features): Move location stores to features/model"
git commit -m "[fsd] refactor(features): Implement Public API for all features"
git commit -m "[fsd] refactor(features): Update 50+ imports to use Public API"

# Phase 4-7
# (각 Phase별 유사한 방식)
```

### 브랜치 전략
- 현재 브랜치: `refactor/fsd/50/yj`
- 각 Phase별 서브 브랜치 생성 (선택사항)

---

## 위험 요소 및 대응

### High Risk
1. **Phase 3**: Store 이동 + cross-import 처리 (가장 복잡)
   - **대응**: 작은 단위로 커밋, 각 store별로 순차 처리

2. **HomeButton.tsx**: 3개 store 동시 의존
   - **대응**: Phase 1, 3에서 순차적으로 처리

3. **GlobalMap.tsx**: 11개 의존성
   - **대응**: Phase 2에서 이동, Phase 3에서 store 의존성 해결

### Medium Risk
4. **Import 경로 대량 변경** (50+ 파일)
   - **대응**: 전역 검색-치환, 단계별 검증

5. **순환 의존성 발생 가능**
   - **대응**: Phase 7에서 검증 스크립트 실행

### Mitigation
- ✅ 각 Phase 완료 후 빌드/타입 체크
- ✅ 주요 기능 수동 테스트 (Phase 2, 3, 7)
- ✅ Git 커밋 단위 작게 유지 (롤백 용이)

---

## 예상 결과

### Before
- FSD 준수율: 74%
- App Store 의존성: 33건
- Public API 구현: 0%
- Cross-layer 위반: 70건+

### After
- FSD 준수율: 95%+
- App Store 의존성: 0건
- Public API 구현: 100%
- Cross-layer 위반: 0건 (문서화된 cross-feature만)

---

## 검증 완료 조건

✅ 모든 레이어가 의존성 규칙 준수
✅ Public API 100% 구현
✅ App Store 의존성 0건
✅ 빌드 성공
✅ 타입 체크 통과
✅ 주요 기능 정상 동작
✅ 순환 의존성 없음
