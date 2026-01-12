# FSD 아키텍처 점검 결과

> **점검 일시**: 2026-01-12
> **전체 파일 수**: 170개 TypeScript 파일
> **FSD 준수율**: 약 74%

---

## 📁 1. 폴더 구조 검증

### ✅ **정상**: src/ 하위 레이어 구조
프로젝트의 src/ 직하위 폴더 구조는 FSD 아키텍처를 올바르게 준수하고 있습니다:
```
src/
├── app/          ✅ 애플리케이션 레이어
├── pages/        ✅ 페이지 레이어
├── widgets/      ✅ 위젯 레이어
├── features/     ✅ 기능 레이어
├── entities/     ✅ 엔티티 레이어
└── shared/       ✅ 공유 레이어
```

---

## 🚨 2. Import 의존성 규칙 위반 (Critical)

### 위반 유형별 통계
| 위반 유형 | 심각도 | 위반 건수 | 영향받는 파일 |
|----------|--------|----------|-------------|
| **ENTITIES → APP** | 🚨 Critical | 4건 | 2개 파일 |
| **ENTITIES → FEATURES** | 🚨 Critical | 28건 | 6개 파일 |
| **ENTITIES → WIDGETS** | 🚨 Critical | 1건 | 1개 파일 |
| **FEATURES → APP** | 🚨 Critical | 17건 | 12개 파일 |
| **WIDGETS → APP** | 🚨 Critical | 11건 | 9개 파일 |
| **PAGES → APP** | 🚨 Critical | 1건 | 1개 파일 |
| **합계** | | **62건** | **31개 파일** |

### 🚨 2-1. ENTITIES → APP (하위가 최상위 import)
**문제**: Entities 레이어가 App 레이어의 Store를 직접 import

| 파일 경로 | 위반 내용 |
|----------|----------|
| `src/entities/location/ui/LocationReviewAll.tsx` | `confirmModalStore` import |
| `src/entities/map/ui/GlobalMap.tsx` | `createLocationStore`, `locationStore`, `productFilterStore` import (3건) |

**영향**: Entities는 순수한 비즈니스 엔티티여야 하는데, 전역 상태에 강하게 결합되어 재사용성이 떨어짐

---

### 🚨 2-2. ENTITIES → FEATURES (하위가 상위 import)
**문제**: Entities가 Features의 hooks와 컴포넌트를 import

| 파일 경로 | 위반 건수 | 주요 위반 내용 |
|----------|----------|--------------|
| `src/entities/location/ui/LocationReviewPhoto.tsx` | 1건 | `useFetchReviewImagesByLocation` |
| `src/entities/location/ui/LocationReviewAll.tsx` | 3건 | `useFetchProducts`, `useFetchReviewsByLocation`, `ReviewItem` |
| `src/entities/location/ui/LocationHome.tsx` | 9건 | 다수의 features hooks/components |
| `src/entities/user/ui/MyPage.tsx` | 7건 | User update hooks, profile image hook 등 |
| `src/entities/map/ui/GlobalMap.tsx` | 7건 | Location, product, user features imports |
| `src/entities/map/ui/LocationMap.tsx` | 1건 | `AbbrLocation` type |

**영향**: Entities가 Features에 의존하여 계층 구조가 역전됨

---

### 🚨 2-3. ENTITIES → WIDGETS (하위가 상위 import)
| 파일 경로 | 위반 내용 |
|----------|----------|
| `src/entities/map/ui/GlobalMap.tsx` | `MapAsideBar` widget import |

---

### 🚨 2-4. FEATURES → APP (기능이 앱 레이어 import)
**가장 많은 위반 사례**: 총 12개 파일에서 17건 위반

**주요 위반 파일들**:
- `features/auth/signOut/ui/SignOutButton.tsx` - confirmModalStore
- `features/auth/signIn/ui/SignInWithPassword.tsx` - locationStore
- `features/location/update/ui/SelectProductItem.tsx` - productFilterStore
- `features/location/create/ui/CreateLocationModal.tsx` - 4개 store import
- `features/user/fetch/ui/UserProfileModal.tsx` - createLocationStore, sessionStore
- `features/review/fetch/ui/ReviewItem.tsx` - confirmModalStore, sessionStore
- 등 6개 추가 파일

**패턴**: 주로 `app/store/*Store.ts`를 직접 import

---

### 🚨 2-5. WIDGETS → APP (위젯이 앱 레이어 import)
**9개 파일에서 11건 위반**

| 파일 경로 | import한 Store |
|----------|---------------|
| `widgets/layout/UserDetailLayout.tsx` | sessionStore |
| `widgets/layout/CreateReviewLayout.tsx` | sessionStore |
| `widgets/layout/UnloggedInLayout.tsx` | sessionStore |
| `widgets/layout/LocationDetailLayout.tsx` | sessionStore |
| `widgets/layout/MapLayout.tsx` | LocationProvider, createLocationStore, sessionStore (3건) |
| `widgets/aside/MapAsideBar.tsx` | createLocationStore |
| `widgets/header/CreateReviewHeader.tsx` | confirmModalStore |
| `widgets/header/DetailHeader.tsx` | locationStore |
| `widgets/header/MapHeader.tsx` | createLocationStore |

---

### 🚨 2-6. PAGES → APP (페이지가 앱 레이어 import)
| 파일 경로 | 위반 내용 |
|----------|----------|
| `src/pages/review/ReviewCreatePage.tsx` | `confirmModalStore` import |

---

## ⚠️ 3. 같은 레이어 간 Cross-Import (High Priority)

### 3-1. ENTITIES 레이어 내부 Cross-Import
| 파일 경로 | 위반 내용 |
|----------|----------|
| `src/entities/location/ui/LocationHome.tsx` | `entities/map/ui/LocationMap` import |

**문제**: entities/location이 entities/map을 import (같은 레이어끼리 의존)

---

### 3-2. FEATURES 레이어 내부 Cross-Import
| 파일 경로 | 다른 Feature import |
|----------|-------------------|
| `features/location/fetch/ui/LocationInfoModal.tsx` | `favorite`, `product`, `review` features (5건) |
| `features/location/fetch/ui/LocationFinder.tsx` | `user` feature (1건) |

**문제**: features끼리 직접 의존하여 순환 참조 위험 및 독립성 훼손

---

## 📦 4. Public API (index.ts) 누락

### 🚨 **Critical**: 모든 슬라이스에서 Public API 누락

**누락 통계**:
- **Features**: 22개 슬라이스 모두 `index.ts` 없음
- **Entities**: 8개 슬라이스 모두 `index.ts` 없음
- **Pages**: 12개 슬라이스 모두 `index.ts` 없음
- **Widgets**: 5개 슬라이스 모두 `index.ts` 없음

**총 47개 슬라이스에서 Public API 누락**

**예시 (Features)**:
```
❌ src/features/auth/               - index.ts 없음
❌ src/features/auth/signUp/        - index.ts 없음
❌ src/features/auth/signOut/       - index.ts 없음
❌ src/features/auth/signIn/        - index.ts 없음
❌ src/features/location/           - index.ts 없음
❌ src/features/location/update/    - index.ts 없음
❌ src/features/location/delete/    - index.ts 없음
❌ src/features/location/fetch/     - index.ts 없음
❌ src/features/location/create/    - index.ts 없음
... (13개 더)
```

**결과**: Public API가 없어 내부 구조(`/ui/`, `/hooks/`, `/api/`)를 직접 접근하고 있음

---

## 🛠️ 5. 파일 배치 이슈

### 5-1. Entities 레이어 문제
**현재 상태**: `entities/location/ui/LocationHome.tsx`, `entities/user/ui/MyPage.tsx` 등이 features와 widgets를 조합

**문제점**:
- Entities는 순수한 비즈니스 엔티티 표현만 해야 함
- 기능 조합 로직은 상위 레이어(Pages/Widgets)에 있어야 함

**개선 방안**:
```
❌ entities/location/ui/LocationHome.tsx
   → ✅ pages/location/LocationHomePage.tsx 또는 widgets/location/LocationHome.tsx

❌ entities/user/ui/MyPage.tsx
   → ✅ pages/mypage/MyPage.tsx
```

---

### 5-2. App Store 남용
**현재 상태**: 7개의 전역 store가 모든 레이어에서 직접 사용됨
```
app/store/
├── confirmModalStore.ts        (12개 파일에서 import)
├── createLocationModalStore.ts (3개 파일에서 import)
├── createLocationStore.ts      (7개 파일에서 import)
├── locationStore.ts            (4개 파일에서 import)
├── loginProviderStore.ts
├── productFilterStore.ts       (2개 파일에서 import)
└── sessionStore.ts             (9개 파일에서 import)
```

**문제점**:
- Features, Entities, Widgets가 App 레이어에 강하게 결합
- 테스트 어려움, 재사용성 저하
- 의존성 방향 역전 (Dependency Inversion 위반)

**개선 방안**:
1. **Props Drilling**: 필요한 데이터를 상위에서 하위로 전달
2. **Context API**: 특정 서브트리에만 적용되는 Context로 변경
3. **Features Model**: features 내부에 model 세그먼트로 상태 관리 이동
4. **Composition Pattern**: 상위 레이어에서 조합, 하위 레이어는 순수 컴포넌트

---

## 📊 6. 종합 점수

| 항목 | 수치 |
|-----|------|
| **전체 TypeScript 파일 수** | 170개 |
| **문제가 있는 파일 수** | 45개 이상 |
| **총 위반 건수** | 70건 이상 |
| **FSD 준수율** | **약 74%** |

---

## 🎯 7. 우선순위별 개선 과제

### 🚨 **Priority 1: Critical (즉시 수정 필요)**
1. **App Store 의존성 제거** (62건)
   - 가장 많은 위반 사례
   - 전체 아키텍처 안정성에 영향
   - 리팩토링 범위: entities, features, widgets, pages 전체

2. **Public API 구현** (47개 슬라이스)
   - 모든 슬라이스에 `index.ts` 생성
   - 내부 구조 직접 접근 방지

### ⚠️ **Priority 2: High (빠른 시일 내 수정)**
3. **Same-Layer Cross-Import 제거** (6건)
   - features/location → features/user, product, review, favorite
   - entities/location → entities/map

4. **Entities 파일 재배치** (6개 파일)
   - LocationHome, MyPage 등을 pages 또는 widgets로 이동
   - Entities를 순수 엔티티로 리팩토링

### ℹ️ **Priority 3: Medium (점진적 개선)**
5. **슬라이스 구조 정리**
   - features/auth, features/location, features/user 등의 하위 슬라이스를 통합할지 검토
   - 예: `features/auth/signUp`, `features/auth/signIn` → `features/auth` 단일 슬라이스

---

## 💡 8. 구체적인 리팩토링 가이드

### 8-1. App Store 의존성 제거 예시

**현재 (❌)**:
```tsx
// features/auth/signOut/ui/SignOutButton.tsx
import { useOpenConfirmModal } from '@/app/store/confirmModalStore';

function SignOutButton() {
  const openConfirm = useOpenConfirmModal();
  // ...
}
```

**개선 (✅)**:
```tsx
// features/auth/signOut/ui/SignOutButton.tsx
interface SignOutButtonProps {
  onConfirm: () => void;  // Props로 전달받음
}

function SignOutButton({ onConfirm }: SignOutButtonProps) {
  // ...
}

// pages/mypage/MyPage.tsx (상위 레이어에서 조합)
import { useOpenConfirmModal } from '@/app/store/confirmModalStore';
import { SignOutButton } from '@/features/auth/signOut';

function MyPage() {
  const openConfirm = useOpenConfirmModal();

  return <SignOutButton onConfirm={openConfirm} />;
}
```

---

### 8-2. Public API 구현 예시

**생성할 파일**:
```typescript
// features/auth/signUp/index.ts
export { SignUp, SignUpConfirm } from './ui/SignUp';
export { useSignUpWithEmail } from './hooks/useSignUpWithEmail';
export type { SignUpFormData } from './types/types';
```

**사용처 변경**:
```typescript
// ❌ Before
import { SignUp } from '@/features/auth/signUp/ui/SignUp';
import { useSignUpWithEmail } from '@/features/auth/signUp/hooks/useSignUpWithEmail';

// ✅ After
import { SignUp, useSignUpWithEmail } from '@/features/auth/signUp';
```

---

### 8-3. Same-Layer Cross-Import 제거 예시

**현재 (❌)**:
```tsx
// features/location/fetch/ui/LocationInfoModal.tsx
import { ToggleFavoriteButton } from '@/features/favorite/toggle/ui/ToggleFavoriteButton';
import { ProductList } from '@/features/product/item/ui/ProductList';
```

**개선 방법 1: 상위 레이어에서 조합 (✅)**:
```tsx
// pages/location/LocationDetailPage.tsx
import { LocationInfo } from '@/features/location/fetch';
import { ToggleFavoriteButton } from '@/features/favorite/toggle';
import { ProductList } from '@/features/product/item';

function LocationDetailPage() {
  return (
    <>
      <LocationInfo />
      <ToggleFavoriteButton />
      <ProductList />
    </>
  );
}
```

**개선 방법 2: Entities로 추상화 (✅)**:
```tsx
// entities/location/model/types.ts
export interface Location {
  id: string;
  name: string;
  isFavorite: boolean;
  products: Product[];
}

// features/location/fetch/ui/LocationInfoModal.tsx
// entities만 import
import { Location } from '@/entities/location';
```

---

## 🎓 9. FSD 아키텍처 핵심 원칙 요약

### 의존성 방향 규칙
```
app     → pages, widgets, features, entities, shared ✅
pages   → widgets, features, entities, shared ✅
widgets → features, entities, shared ✅
features → entities, shared ✅
entities → shared만 ✅
shared  → 아무것도 import 불가 ✅
```

### 같은 레이어 규칙
- ❌ features끼리 cross-import 금지
- ❌ entities끼리 cross-import 금지 (예외: @x 표기법)
- ✅ 조합은 상위 레이어(pages, widgets)에서

### Public API 규칙
- ✅ 모든 슬라이스에 `index.ts` 필수
- ✅ 외부에서는 Public API로만 접근
- ❌ 내부 구조(`/ui/`, `/hooks/`) 직접 접근 금지

---

## 🔍 10. 참고 자료

- **Feature-Sliced Design 공식 문서**: https://feature-sliced.design/
- **Layers Reference**: https://feature-sliced.design/docs/reference/layers
- **Public API Guide**: https://feature-sliced.design/docs/reference/public-api

---

## 📝 종합 의견

프로젝트는 **폴더 구조는 FSD 아키텍처를 올바르게 따르고 있으나**, **의존성 관리와 Public API 구현에서 중대한 문제**가 있습니다.

### 주요 문제점
1. **App Store 과다 사용**: 전역 상태 관리가 모든 레이어에 침투하여 FSD의 핵심 원칙인 "하위에서 상위로의 의존성 금지"를 위반
2. **Public API 전면 부재**: 47개 모든 슬라이스에서 `index.ts` 누락
3. **Entities 레이어 오용**: 순수 엔티티가 아닌 페이지/위젯 수준의 컴포넌트 포함

### 긍정적인 점
- 폴더 구조 자체는 FSD 표준 준수
- 세그먼트 구조(`ui/`, `api/`, `hooks/`) 일관성 있게 사용
- 타입 정의와 유틸리티 분리 잘 되어 있음

**권장 사항**: Priority 1(App Store 의존성 제거, Public API 구현)부터 단계적으로 리팩토링을 진행하시면, 유지보수성과 확장성이 크게 개선될 것입니다.
