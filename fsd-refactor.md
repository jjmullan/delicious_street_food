# FSD 아키텍처 리팩토링 계획

> **작성일**: 2026-01-13
> **기준 문서**: fsd.md
> **진행 방식**: Priority 역순 (3 → 2 → 1)

---

## 📋 리팩토링 진행 순서

```
Phase 1: 슬라이스 구조 정리 (Priority 3)
   ↓
Phase 2: Entities 파일 재배치 (Priority 2-B)
   ↓
Phase 3: Same-Layer Cross-Import 제거 (Priority 2-A)
   ↓
Phase 4: Public API 구현 (Priority 1-B)
   ↓
Phase 5: App Store 의존성 제거 (Priority 1-A)
```

**진행 이유**:
- 먼저 구조를 정리하고 파일을 올바른 위치로 이동
- 레이어 간 의존성 정리 후 Public API 구현
- 마지막으로 가장 영향 범위가 큰 App Store 의존성 제거

---

## Phase 1: 슬라이스 구조 정리

### 목표
중복되거나 과도하게 분리된 슬라이스를 통합하여 관리 용이성 향상

### 현재 상태 분석

#### Features 레이어
```
features/
├── auth/
│   ├── signUp/      ← 통합 검토
│   ├── signIn/      ← 통합 검토
│   └── signOut/     ← 통합 검토
├── location/
│   ├── create/      ← 통합 검토
│   ├── fetch/       ← 통합 검토
│   ├── update/      ← 통합 검토
│   └── delete/      ← 통합 검토
├── user/
│   ├── create/      ← 통합 검토
│   ├── fetch/       ← 통합 검토
│   └── update/      ← 통합 검토
├── review/
│   ├── create/      ← 통합 검토
│   ├── fetch/       ← 통합 검토
│   └── delete/      ← 통합 검토
├── favorite/
│   ├── fetch/       ← 통합 검토
│   └── toggle/      ← 통합 검토
└── product/
    └── item/        ← 적절함 (단일 슬라이스)
```

### 작업 항목

#### ✅ 1-1. 통합 필요성 판단 기준
- [ ] 각 하위 슬라이스가 독립적으로 사용되는가?
- [ ] 하위 슬라이스 간 공유되는 타입/유틸이 많은가?
- [ ] 통합 시 Public API가 더 명확해지는가?

#### ✅ 1-2. 권장 통합 방안

**Option A: 완전 통합 (권장)**
```
features/
├── auth/                    # 통합
│   ├── ui/
│   │   ├── SignUp.tsx
│   │   ├── SignIn.tsx
│   │   └── SignOutButton.tsx
│   ├── hooks/
│   │   ├── useSignUp.tsx
│   │   ├── useSignIn.tsx
│   │   └── useSignOut.tsx
│   ├── api/
│   │   └── auth.ts
│   ├── types/
│   └── index.ts
├── location/                # 통합
│   ├── ui/
│   ├── hooks/
│   ├── api/
│   ├── types/
│   └── index.ts
... (나머지 동일)
```

**Option B: 부분 통합 (현재 구조 유지하되 index.ts로 노출)**
```
features/
├── auth/
│   ├── signUp/
│   ├── signIn/
│   ├── signOut/
│   └── index.ts           # Public API 추가
├── location/
│   ├── create/
│   ├── fetch/
│   ├── update/
│   ├── delete/
│   └── index.ts           # Public API 추가
```

### 결정 사항
- [ ] Option A (완전 통합) 선택
- [ ] Option B (부분 통합) 선택

---

## Phase 2: Entities 파일 재배치

### 목표
Entities 레이어를 순수한 비즈니스 엔티티로 정리

### 문제 파일 목록

| 현재 위치 | 문제점 | 이동 대상 | 우선순위 |
|----------|--------|----------|---------|
| `entities/location/ui/LocationHome.tsx` | Features/Widgets 조합 | `pages/location/LocationHomePage.tsx` | 🚨 Critical |
| `entities/user/ui/MyPage.tsx` | Features 다수 사용 | `pages/mypage/MyPageHomePage.tsx` | 🚨 Critical |
| `entities/map/ui/GlobalMap.tsx` | App Store 3건, Features 7건, Widget 1건 import | `widgets/map/GlobalMap.tsx` | 🚨 Critical |
| `entities/location/ui/LocationReviewAll.tsx` | Features 3건, App Store 1건 | `widgets/location/LocationReviewAll.tsx` | ⚠️ High |
| `entities/location/ui/LocationReviewPhoto.tsx` | Features 1건 | `widgets/location/LocationReviewPhoto.tsx` | ⚠️ High |
| `entities/map/ui/LocationMap.tsx` | Features 1건 | `widgets/map/LocationMap.tsx` | ⚠️ Medium |

### 작업 항목

#### ✅ 2-1. LocationHome.tsx 이동
```bash
# 현재
src/entities/location/ui/LocationHome.tsx

# 이동 후
src/pages/location/LocationHomePage.tsx
```

**수정 내용**:
- [ ] 파일 이동
- [ ] import 경로 업데이트 (9건 features imports)
- [ ] 관련 페이지 라우팅 업데이트

#### ✅ 2-2. MyPage.tsx 이동
```bash
# 현재
src/entities/user/ui/MyPage.tsx

# 이동 후
src/pages/mypage/MyPageHomePage.tsx
```

**수정 내용**:
- [ ] 파일 이동
- [ ] import 경로 업데이트 (7건 features imports)
- [ ] 관련 페이지 라우팅 업데이트

#### ✅ 2-3. GlobalMap.tsx 이동
```bash
# 현재
src/entities/map/ui/GlobalMap.tsx

# 이동 후
src/widgets/map/GlobalMap.tsx
```

**수정 내용**:
- [ ] 파일 이동
- [ ] import 경로 업데이트:
  - App Store 3건 (Phase 5에서 처리)
  - Features 7건
  - Widget 1건 (MapAsideBar)
- [ ] 관련 페이지에서 import 경로 업데이트

#### ✅ 2-4. LocationReviewAll.tsx 이동
```bash
# 현재
src/entities/location/ui/LocationReviewAll.tsx

# 이동 후
src/widgets/location/LocationReviewAll.tsx
```

**수정 내용**:
- [ ] 파일 이동
- [ ] import 경로 업데이트 (Features 3건, App Store 1건)

#### ✅ 2-5. LocationReviewPhoto.tsx 이동
```bash
# 현재
src/entities/location/ui/LocationReviewPhoto.tsx

# 이동 후
src/widgets/location/LocationReviewPhoto.tsx
```

**수정 내용**:
- [ ] 파일 이동
- [ ] import 경로 업데이트 (Features 1건)

#### ✅ 2-6. LocationMap.tsx 이동
```bash
# 현재
src/entities/map/ui/LocationMap.tsx

# 이동 후
src/widgets/map/LocationMap.tsx
```

**수정 내용**:
- [ ] 파일 이동
- [ ] import 경로 업데이트 (Features 1건)

#### ✅ 2-7. Entities 폴더 정리
- [ ] 빈 폴더 제거 (`entities/location/ui`, `entities/user/ui`, `entities/map/ui`)
- [ ] Entities 레이어를 순수 비즈니스 엔티티 타입/모델로만 구성

---

## Phase 3: Same-Layer Cross-Import 제거

### 목표
같은 레이어끼리의 직접 의존성 제거

### 위반 사례

#### 🚨 3-1. Features → Features (5건)
| 파일 | 위반 import | 해결 방법 |
|------|------------|----------|
| `features/location/fetch/ui/LocationInfoModal.tsx` | `favorite`, `product`, `review` (5건) | Pages에서 조합 또는 Entities로 추상화 |
| `features/location/fetch/ui/LocationFinder.tsx` | `user` (1건) | Props로 전달 또는 Entities 활용 |

#### ⚠️ 3-2. Entities → Entities (1건)
| 파일 | 위반 import | 해결 방법 |
|------|------------|----------|
| `entities/location/ui/LocationHome.tsx` | `entities/map/ui/LocationMap` | Phase 2에서 이동 시 해결 (Pages로) |

### 작업 항목

#### ✅ 3-1. LocationInfoModal.tsx 리팩토링

**현재 코드 (❌)**:
```tsx
// features/location/fetch/ui/LocationInfoModal.tsx
import { ToggleFavoriteButton } from '@/features/favorite/toggle/ui/ToggleFavoriteButton';
import { ProductList } from '@/features/product/item/ui/ProductList';
import { ReviewItem } from '@/features/review/fetch/ui/ReviewItem';
```

**개선 방안 1: Pages에서 조합 (✅ 권장)**
```tsx
// pages/location/LocationDetailPage.tsx
import { LocationInfo } from '@/features/location/fetch';
import { ToggleFavoriteButton } from '@/features/favorite/toggle';
import { ProductList } from '@/features/product/item';
import { ReviewList } from '@/features/review/fetch';

function LocationDetailPage() {
  return (
    <>
      <LocationInfo />
      <ToggleFavoriteButton />
      <ProductList />
      <ReviewList />
    </>
  );
}
```

**개선 방안 2: Entities로 추상화 (✅ 선택 사항)**
```tsx
// entities/location/model/types.ts
export interface LocationDetail {
  id: string;
  name: string;
  isFavorite: boolean;
  products: Product[];
  reviews: Review[];
}

// features/location/fetch/ui/LocationInfoModal.tsx
import { LocationDetail } from '@/entities/location';
```

**작업**:
- [ ] LocationInfoModal을 순수 컴포넌트로 리팩토링
- [ ] Pages 레이어에서 feature 조합
- [ ] Cross-import 제거 확인

#### ✅ 3-2. LocationFinder.tsx 리팩토링

**현재 코드 (❌)**:
```tsx
// features/location/fetch/ui/LocationFinder.tsx
import { UserProfile } from '@/features/user/fetch/ui/UserProfileModal';
```

**개선 방안: Props로 전달 (✅)**
```tsx
// features/location/fetch/ui/LocationFinder.tsx
interface LocationFinderProps {
  onUserClick?: (userId: string) => void;
}

// pages에서 조합
import { LocationFinder } from '@/features/location/fetch';
import { useOpenUserProfile } from '@/features/user/fetch';

function Page() {
  const openUserProfile = useOpenUserProfile();
  return <LocationFinder onUserClick={openUserProfile} />;
}
```

**작업**:
- [ ] LocationFinder Props 추가
- [ ] User feature import 제거
- [ ] Pages에서 조합 구현

---

## Phase 4: Public API 구현

### 목표
모든 슬라이스에 Public API (`index.ts`) 생성

### 현황
- **누락 슬라이스 수**: 47개
- **영향 범위**: Features, Entities, Pages, Widgets 전체

### Public API 구현 원칙

1. **노출할 것**
   - UI 컴포넌트 (외부에서 사용)
   - Custom Hooks
   - 타입 정의 (다른 레이어에서 필요한 경우)
   - 유틸리티 함수 (재사용 가능)

2. **숨길 것**
   - API 함수 (내부 구현)
   - 내부 유틸리티
   - Private 컴포넌트
   - 상수 (내부 전용)

### 작업 항목

#### ✅ 4-1. Features 레이어 Public API (22개 슬라이스)

**예시: features/auth/signUp/index.ts**
```typescript
// UI Components
export { SignUp, SignUpConfirm } from './ui/SignUp';

// Custom Hooks
export { useSignUpWithEmail } from './hooks/useSignUpWithEmail';

// Types (외부에서 필요한 경우만)
export type { SignUpFormData } from './types/types';

// Utils (재사용 가능한 경우만)
export { validateEmail, validatePassword } from './util/validatePassword';
```

**생성할 index.ts 목록**:
- [ ] `features/auth/signUp/index.ts`
- [ ] `features/auth/signIn/index.ts`
- [ ] `features/auth/signOut/index.ts`
- [ ] `features/location/create/index.ts`
- [ ] `features/location/fetch/index.ts`
- [ ] `features/location/update/index.ts`
- [ ] `features/location/delete/index.ts`
- [ ] `features/favorite/fetch/index.ts`
- [ ] `features/favorite/toggle/index.ts`
- [ ] `features/user/create/index.ts`
- [ ] `features/user/fetch/index.ts`
- [ ] `features/user/update/index.ts`
- [ ] `features/product/item/index.ts`
- [ ] `features/review/create/index.ts`
- [ ] `features/review/fetch/index.ts`
- [ ] `features/review/delete/index.ts`

#### ✅ 4-2. Entities 레이어 Public API (8개 슬라이스)

**예시: entities/location/index.ts**
```typescript
// Types & Interfaces
export type { Location, LocationDetail, LocationAddress } from './model/types';

// Utils (비즈니스 로직)
export { validateLocationDistance } from './lib/validation';
export { formatLocationAddress } from './lib/formatter';
```

**생성할 index.ts 목록**:
- [ ] `entities/location/index.ts`
- [ ] `entities/user/index.ts`
- [ ] `entities/map/index.ts`
- [ ] `entities/review/index.ts`
- [ ] `entities/product/index.ts`
- [ ] `entities/favorite/index.ts`

#### ✅ 4-3. Widgets 레이어 Public API (5개 슬라이스)

**예시: widgets/header/index.ts**
```typescript
export { MapHeader } from './MapHeader';
export { DetailHeader } from './DetailHeader';
export { UnloggedInHeader } from './UnloggedInHeader';
export { CreateReviewHeader } from './CreateReviewHeader';
```

**생성할 index.ts 목록**:
- [ ] `widgets/header/index.ts`
- [ ] `widgets/footer/index.ts`
- [ ] `widgets/nav/index.ts`
- [ ] `widgets/aside/index.ts`
- [ ] `widgets/layout/index.ts`

#### ✅ 4-4. Pages 레이어 Public API (12개 슬라이스)

**예시: pages/home/index.ts**
```typescript
export { HomePage } from './HomePage';
```

**생성할 index.ts 목록**:
- [ ] `pages/home/index.ts`
- [ ] `pages/location/index.ts`
- [ ] `pages/mypage/home/index.ts`
- [ ] `pages/mypage/favorite/index.ts`
- [ ] `pages/mypage/review/index.ts`
- [ ] `pages/review/index.ts`
- [ ] `pages/signUp/index.ts`
- [ ] `pages/login/common/index.ts`
- [ ] `pages/login/email/index.ts`
- [ ] `pages/error/index.ts`

#### ✅ 4-5. 전체 import 경로 업데이트

**변경 전 (❌)**:
```typescript
import { SignUp } from '@/features/auth/signUp/ui/SignUp';
import { useSignUpWithEmail } from '@/features/auth/signUp/hooks/useSignUpWithEmail';
```

**변경 후 (✅)**:
```typescript
import { SignUp, useSignUpWithEmail } from '@/features/auth/signUp';
```

**작업**:
- [ ] 모든 import 문 검색 및 변경
- [ ] `/ui/`, `/hooks/`, `/api/` 경로 제거
- [ ] Public API로만 접근하도록 수정
- [ ] 빌드 테스트 및 오류 수정

---

## Phase 5: App Store 의존성 제거

### 목표
하위 레이어에서 App 레이어의 전역 Store 직접 import 제거

### 위반 통계
| 레이어 | 위반 건수 | 영향 파일 수 |
|--------|----------|-------------|
| ENTITIES → APP | 4건 | 2개 |
| FEATURES → APP | 17건 | 12개 |
| WIDGETS → APP | 11건 | 9개 |
| PAGES → APP | 1건 | 1개 |
| **합계** | **33건** | **24개** |

### App Store 목록 및 사용 현황

```typescript
app/store/
├── confirmModalStore.ts        (12개 파일에서 import)
├── createLocationStore.ts      (7개 파일에서 import)
├── locationStore.ts            (4개 파일에서 import)
├── sessionStore.ts             (9개 파일에서 import)
├── productFilterStore.ts       (2개 파일에서 import)
├── createLocationModalStore.ts (3개 파일에서 import)
└── loginProviderStore.ts       (사용 현황 미파악)
```

### 개선 전략

#### 전략 1: Props Drilling
상위 레이어에서 하위로 데이터/핸들러 전달

#### 전략 2: Context API
특정 서브트리에만 적용되는 로컬 Context

#### 전략 3: Features Model
Features 내부에 model 세그먼트로 상태 관리 이동

#### 전략 4: Composition Pattern
상위 레이어에서 조합, 하위는 순수 컴포넌트

### 작업 항목

#### ✅ 5-1. confirmModalStore 리팩토링 (12개 파일)

**사용 파일 목록**:
- `features/auth/signOut/ui/SignOutButton.tsx`
- `features/location/create/ui/CreateLocationModal.tsx`
- `features/review/fetch/ui/ReviewItem.tsx`
- `widgets/header/CreateReviewHeader.tsx`
- `pages/review/ReviewCreatePage.tsx`
- ... (7개 추가 파일)

**개선 방안: Props로 전달 (✅)**

```typescript
// Before (❌)
// features/auth/signOut/ui/SignOutButton.tsx
import { useOpenConfirmModal } from '@/app/store/confirmModalStore';

function SignOutButton() {
  const openConfirm = useOpenConfirmModal();
  // ...
}

// After (✅)
// features/auth/signOut/ui/SignOutButton.tsx
interface SignOutButtonProps {
  onConfirm: () => void;
}

function SignOutButton({ onConfirm }: SignOutButtonProps) {
  // ...
}

// pages/mypage/MyPageHomePage.tsx
import { useOpenConfirmModal } from '@/app/store/confirmModalStore';
import { SignOutButton } from '@/features/auth/signOut';

function MyPageHomePage() {
  const openConfirm = useOpenConfirmModal();
  return <SignOutButton onConfirm={openConfirm} />;
}
```

**작업**:
- [ ] SignOutButton Props 추가
- [ ] CreateLocationModal Props 추가
- [ ] ReviewItem Props 추가
- [ ] CreateReviewHeader Props 추가
- [ ] ReviewCreatePage에서만 confirmModalStore 사용
- [ ] 나머지 7개 파일 수정
- [ ] confirmModalStore import 제거 확인

#### ✅ 5-2. sessionStore 리팩토링 (9개 파일)

**사용 파일 목록**:
- `widgets/layout/UserDetailLayout.tsx`
- `widgets/layout/CreateReviewLayout.tsx`
- `widgets/layout/UnloggedInLayout.tsx`
- `widgets/layout/LocationDetailLayout.tsx`
- `widgets/layout/MapLayout.tsx`
- `features/user/fetch/ui/UserProfileModal.tsx`
- `features/review/fetch/ui/ReviewItem.tsx`
- ... (2개 추가 파일)

**개선 방안: Context API (✅)**

```typescript
// app/provider/SessionProvider.tsx
import { createContext, useContext } from 'react';

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  // sessionStore 로직을 여기로 이동
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}

export function useSession() {
  return useContext(SessionContext);
}

// widgets/layout/UserDetailLayout.tsx
import { useSession } from '@/app/provider/SessionProvider';

function UserDetailLayout() {
  const session = useSession();
  // ...
}
```

**작업**:
- [ ] SessionProvider에 sessionStore 로직 통합
- [ ] useSession hook 생성
- [ ] 9개 파일에서 sessionStore → useSession 변경
- [ ] sessionStore.ts 파일 제거 (또는 SessionProvider 내부로 이동)

#### ✅ 5-3. createLocationStore 리팩토링 (7개 파일)

**사용 파일 목록**:
- `widgets/layout/MapLayout.tsx`
- `widgets/aside/MapAsideBar.tsx`
- `widgets/header/MapHeader.tsx`
- `features/location/create/ui/CreateLocationModal.tsx`
- `features/user/fetch/ui/UserProfileModal.tsx`
- `entities/map/ui/GlobalMap.tsx` (Phase 2에서 widgets로 이동)
- ... (1개 추가 파일)

**개선 방안: Features Model로 이동 (✅)**

```typescript
// features/location/create/model/createLocationModel.ts
import { create } from 'zustand';

export const useCreateLocationStore = create((set) => ({
  // createLocationStore 로직 이동
}));

// features/location/create/index.ts
export { useCreateLocationStore } from './model/createLocationModel';

// widgets/layout/MapLayout.tsx
import { useCreateLocationStore } from '@/features/location/create';
```

**작업**:
- [ ] `features/location/create/model/` 폴더 생성
- [ ] createLocationStore → createLocationModel 이동
- [ ] Public API에 export 추가
- [ ] 7개 파일 import 경로 변경
- [ ] app/store/createLocationStore.ts 제거

#### ✅ 5-4. locationStore 리팩토링 (4개 파일)

**사용 파일 목록**:
- `features/auth/signIn/ui/SignInWithPassword.tsx`
- `widgets/header/DetailHeader.tsx`
- `entities/map/ui/GlobalMap.tsx` (Phase 2에서 widgets로 이동)
- ... (1개 추가 파일)

**개선 방안: Features Model로 이동 (✅)**

```typescript
// features/location/fetch/model/locationModel.ts
export const useLocationStore = create((set) => ({
  // locationStore 로직 이동
}));

// features/location/fetch/index.ts
export { useLocationStore } from './model/locationModel';
```

**작업**:
- [ ] `features/location/fetch/model/` 폴더 생성
- [ ] locationStore → locationModel 이동
- [ ] 4개 파일 import 경로 변경
- [ ] app/store/locationStore.ts 제거

#### ✅ 5-5. productFilterStore 리팩토링 (2개 파일)

**사용 파일 목록**:
- `features/location/update/ui/SelectProductItem.tsx`
- `entities/map/ui/GlobalMap.tsx` (Phase 2에서 widgets로 이동)

**개선 방안: Features Model로 이동 (✅)**

```typescript
// features/product/item/model/productFilterModel.ts
export const useProductFilterStore = create((set) => ({
  // productFilterStore 로직 이동
}));

// features/product/item/index.ts
export { useProductFilterStore } from './model/productFilterModel';
```

**작업**:
- [ ] `features/product/item/model/` 폴더 생성
- [ ] productFilterStore → productFilterModel 이동
- [ ] 2개 파일 import 경로 변경
- [ ] app/store/productFilterStore.ts 제거

#### ✅ 5-6. createLocationModalStore 리팩토링 (3개 파일)

**개선 방안: Features Model로 이동 (✅)**

```typescript
// features/location/create/model/createLocationModalModel.ts
export const useCreateLocationModalStore = create((set) => ({
  // createLocationModalStore 로직 이동
}));
```

**작업**:
- [ ] createLocationModalStore → createLocationModalModel 이동
- [ ] 3개 파일 import 경로 변경
- [ ] app/store/createLocationModalStore.ts 제거

#### ✅ 5-7. loginProviderStore 검토

**작업**:
- [ ] 사용 현황 파악
- [ ] Provider로 전환 또는 Features Model로 이동
- [ ] app/store/loginProviderStore.ts 제거 (또는 유지)

---

## 📊 최종 폴더 구조 (리팩토링 완료 후)

### Features 레이어
```
src/features/
├── auth/
│   ├── ui/
│   │   ├── SignUp.tsx
│   │   ├── SignUpConfirm.tsx
│   │   ├── SignInWithPassword.tsx
│   │   ├── SignInCommon.tsx
│   │   └── SignOutButton.tsx
│   ├── hooks/
│   │   ├── useSignUpWithEmail.tsx
│   │   ├── useSignInWithPassword.tsx
│   │   ├── useSignInWithOAuth.tsx
│   │   └── useSignOut.tsx
│   ├── api/
│   │   └── auth.ts
│   ├── types/
│   │   └── types.ts
│   ├── utils/
│   │   ├── validatePassword.ts
│   │   └── validateEmail.ts
│   ├── lib/
│   │   └── regExp.ts
│   └── index.ts               # ✅ Public API
│
├── location/
│   ├── ui/
│   │   ├── CreateLocationModal.tsx
│   │   ├── LocationInfoModal.tsx
│   │   ├── LocationFinder.tsx
│   │   ├── LocationProductItem.tsx
│   │   ├── SearchLocationBar.tsx
│   │   ├── SelectProductItem.tsx
│   │   ├── ToggleSwitchLocationModeButton.tsx
│   │   ├── ResetCreateModeButton.tsx
│   │   └── CreateLocation.tsx
│   ├── hooks/
│   │   ├── useCreateLocation.tsx
│   │   ├── useFetchLocation.tsx
│   │   ├── useFetchLocations.tsx
│   │   ├── useFetchLocationsByProducts.tsx
│   │   ├── useUpdateLocation.tsx
│   │   └── useDeleteLocation.tsx
│   ├── model/                 # ✅ Store 이동
│   │   ├── createLocationModel.ts
│   │   ├── createLocationModalModel.ts
│   │   └── locationModel.ts
│   ├── api/
│   │   └── location.ts
│   ├── types/
│   │   └── location.ts
│   ├── utils/
│   │   ├── getLocationAddress.ts
│   │   ├── getLocationData.tsx
│   │   └── validateLocationDistance.ts
│   ├── libs/
│   │   ├── location.ts
│   │   └── distance.ts
│   └── index.ts               # ✅ Public API
│
├── favorite/
│   ├── ui/
│   │   └── ToggleFavoriteButton.tsx
│   ├── hooks/
│   │   ├── useToggleFavorite.tsx
│   │   ├── useFetchFavoriteByLocation.tsx
│   │   └── useFetchFavoriteByUser.tsx
│   ├── api/
│   │   └── favorite.ts
│   └── index.ts               # ✅ Public API
│
├── user/
│   ├── ui/
│   │   └── UserProfileModal.tsx
│   ├── hooks/
│   │   ├── useFetchUserData.tsx
│   │   ├── useUpdateProfile.tsx
│   │   ├── useUpdateProfileImage.tsx
│   │   └── useCreateUser.tsx
│   ├── api/
│   │   ├── user.ts
│   │   └── image.ts
│   ├── libs/
│   │   └── validateNickname.ts
│   └── index.ts               # ✅ Public API
│
├── product/
│   ├── ui/
│   │   ├── ProductList.tsx
│   │   ├── ProductItem.tsx
│   │   └── ProductItemForCreate.tsx
│   ├── hooks/
│   │   ├── useFetchProducts.tsx
│   │   └── useFetchProduct.tsx
│   ├── model/                 # ✅ Store 이동
│   │   └── productFilterModel.ts
│   ├── api/
│   │   └── product.ts
│   ├── types/
│   │   └── item.type.ts
│   ├── libs/
│   │   └── item.ts
│   └── index.ts               # ✅ Public API
│
└── review/
    ├── ui/
    │   ├── ReviewItem.tsx
    │   ├── ReviewItemForMypage.tsx
    │   ├── ReviewUserProfile.tsx
    │   ├── ReviewVisitDate.tsx
    │   ├── ReviewTitleAndText.tsx
    │   ├── ReviewProductItem.tsx
    │   ├── CreateReviewTitle.tsx
    │   ├── PreviewImage.tsx
    │   ├── ProgressBar.tsx
    │   ├── SelectProductItemForCreateReview.tsx
    │   └── SelectProductItemDetailForCreateReview.tsx
    ├── hooks/
    │   ├── useFetchReviewImages.tsx
    │   ├── useFetchReviewProducts.tsx
    │   ├── useFetchReviewImagesByLocation.tsx
    │   ├── useFetchReviewProductsByLocation.tsx
    │   ├── useFetchReviewsByUser.tsx
    │   ├── useFetchReviewsByLocation.tsx
    │   ├── useCreateReview.tsx
    │   ├── useCreateReviewImages.tsx
    │   ├── useCreateReviewProduct.tsx
    │   └── useDeleteReview.tsx
    ├── api/
    │   └── review.ts
    ├── types/
    │   └── image.ts
    └── index.ts               # ✅ Public API
```

### Entities 레이어
```
src/entities/
├── location/
│   ├── model/
│   │   ├── types.ts          # 순수 비즈니스 타입
│   │   └── constants.ts
│   └── index.ts              # ✅ Public API
│
├── user/
│   ├── model/
│   │   ├── types.ts
│   │   └── constants.ts
│   └── index.ts              # ✅ Public API
│
├── map/
│   ├── model/
│   │   ├── types.ts
│   │   └── constants.ts
│   └── index.ts              # ✅ Public API
│
├── review/
│   ├── model/
│   │   ├── types.ts
│   │   └── constants.ts
│   └── index.ts              # ✅ Public API
│
├── product/
│   ├── model/
│   │   ├── types.ts
│   │   └── constants.ts
│   └── index.ts              # ✅ Public API
│
└── favorite/
    ├── model/
    │   └── types.ts
    └── index.ts              # ✅ Public API
```

### Widgets 레이어
```
src/widgets/
├── header/
│   ├── MapHeader.tsx
│   ├── DetailHeader.tsx
│   ├── UnloggedInHeader.tsx
│   └── CreateReviewHeader.tsx
│   └── index.ts              # ✅ Public API
│
├── footer/
│   ├── Footer.tsx
│   └── index.ts              # ✅ Public API
│
├── nav/
│   ├── LocationNavigation.tsx
│   └── index.ts              # ✅ Public API
│
├── aside/
│   ├── MapAsideBar.tsx
│   └── index.ts              # ✅ Public API
│
├── layout/
│   ├── GlobalLayout.tsx
│   ├── UserDetailLayout.tsx
│   ├── CreateReviewLayout.tsx
│   ├── UnloggedInLayout.tsx
│   ├── LocationDetailLayout.tsx
│   └── MapLayout.tsx
│   └── index.ts              # ✅ Public API
│
├── location/                 # ✅ Entities에서 이동
│   ├── LocationReviewAll.tsx
│   ├── LocationReviewPhoto.tsx
│   └── index.ts
│
└── map/                      # ✅ Entities에서 이동
    ├── GlobalMap.tsx
    ├── LocationMap.tsx
    └── index.ts
```

### Pages 레이어
```
src/pages/
├── home/
│   ├── HomePage.tsx
│   └── index.ts              # ✅ Public API
│
├── location/
│   ├── LocationPage.tsx
│   ├── LocationHomePage.tsx  # ✅ Entities에서 이동
│   └── index.ts
│
├── mypage/
│   ├── home/
│   │   ├── MyPageHomePage.tsx  # ✅ Entities에서 이동 & 리네임
│   │   └── index.ts
│   ├── favorite/
│   │   ├── MyPageFavoritePage.tsx
│   │   └── index.ts
│   └── review/
│       ├── MyPageReviewPage.tsx
│       └── index.ts
│
├── review/
│   ├── ReviewCreatePage.tsx
│   ├── ReviewPhotoPage.tsx
│   ├── ReviewAllPage.tsx
│   └── index.ts
│
├── signUp/
│   ├── SignUpPage.tsx
│   ├── SignUpConfirmPage.tsx
│   └── index.ts
│
├── login/
│   ├── common/
│   │   ├── SignInCommonPage.tsx
│   │   └── index.ts
│   └── email/
│       ├── SignInWithPasswordPage.tsx
│       └── index.ts
│
└── error/
    ├── ErrorPage.tsx
    └── index.ts
```

### App 레이어
```
src/app/
├── index.tsx
├── provider/
│   ├── SessionProvider.tsx   # ✅ sessionStore 통합
│   ├── ModalProvider.tsx
│   ├── LoginProviderProvider.tsx
│   └── LocationProvider.tsx
├── routes/
│   ├── routes.tsx
│   ├── globalMap.route.tsx
│   ├── locationDetail.route.tsx
│   ├── userDetail.route.tsx
│   ├── createReview.route.tsx
│   └── unloggedIn.route.tsx
├── store/                    # ✅ 대부분 Features로 이동
│   └── (필요시 전역 상태만 유지)
└── styles/
    └── main.css
```

---

## 🎯 예상 효과

### 1. 의존성 방향 정상화
```
✅ app → pages, widgets, features, entities, shared
✅ pages → widgets, features, entities, shared
✅ widgets → features, entities, shared
✅ features → entities, shared
✅ entities → shared만
✅ shared → 아무것도 import 불가
```

### 2. 재사용성 향상
- Features/Entities가 순수 컴포넌트로 변경
- Props를 통한 유연한 조합 가능
- 테스트 용이성 증가

### 3. 유지보수성 개선
- Public API를 통한 명확한 인터페이스
- 내부 구조 변경 시 외부 영향 최소화
- 슬라이스 독립성 증가

### 4. FSD 준수율 향상
```
현재: 약 74%
목표: 95% 이상
```

---

## 📝 주의사항

### 리팩토링 원칙
1. **한 번에 하나의 Phase만 진행**
2. **각 Phase 완료 후 반드시 빌드 테스트**
3. **Git commit은 Phase 단위로 분리**
4. **기존 기능 동작 확인 후 다음 Phase 진행**

### Git 전략
```bash
# Phase별 브랜치 생성
git checkout -b refactor/fsd/phase-1-slice-structure
git checkout -b refactor/fsd/phase-2-entities-relocation
git checkout -b refactor/fsd/phase-3-cross-import
git checkout -b refactor/fsd/phase-4-public-api
git checkout -b refactor/fsd/phase-5-app-store
```

### 테스트 체크리스트
- [ ] 빌드 성공 (`npm run build`)
- [ ] 타입 에러 없음 (`tsc --noEmit`)
- [ ] 런타임 에러 없음 (주요 페이지 수동 테스트)
- [ ] Import 순환 참조 없음
- [ ] Public API만 사용하는지 확인

---

## 🔗 참고 문서

- [FSD 공식 문서](https://feature-sliced.design/)
- [Layers Reference](https://feature-sliced.design/docs/reference/layers)
- [Public API Guide](https://feature-sliced.design/docs/reference/public-api)
- [Import Rules](https://feature-sliced.design/docs/reference/layers#import-rule-on-layers)

---

## ✅ 진행 상황 체크

### Phase 1: 슬라이스 구조 정리
- [ ] 통합 방안 결정
- [ ] 구조 변경 완료
- [ ] 빌드 테스트 통과

### Phase 2: Entities 파일 재배치
- [ ] LocationHome.tsx 이동
- [ ] MyPage.tsx 이동
- [ ] GlobalMap.tsx 이동
- [ ] LocationReviewAll.tsx 이동
- [ ] LocationReviewPhoto.tsx 이동
- [ ] LocationMap.tsx 이동
- [ ] 빈 폴더 정리
- [ ] 빌드 테스트 통과

### Phase 3: Same-Layer Cross-Import 제거
- [ ] LocationInfoModal 리팩토링
- [ ] LocationFinder 리팩토링
- [ ] 빌드 테스트 통과

### Phase 4: Public API 구현
- [ ] Features 레이어 (16개)
- [ ] Entities 레이어 (6개)
- [ ] Widgets 레이어 (5개)
- [ ] Pages 레이어 (10개)
- [ ] 전체 import 경로 업데이트
- [ ] 빌드 테스트 통과

### Phase 5: App Store 의존성 제거
- [ ] confirmModalStore (12개)
- [ ] sessionStore (9개)
- [ ] createLocationStore (7개)
- [ ] locationStore (4개)
- [ ] productFilterStore (2개)
- [ ] createLocationModalStore (3개)
- [ ] loginProviderStore 검토
- [ ] 빌드 테스트 통과

### 최종 점검
- [ ] FSD 의존성 규칙 100% 준수
- [ ] Public API 100% 구현
- [ ] App Store 의존성 0건
- [ ] Same-Layer Cross-Import 0건
- [ ] 전체 빌드 성공
- [ ] 전체 기능 정상 동작
