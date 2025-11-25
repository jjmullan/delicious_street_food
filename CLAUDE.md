# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고할 가이드를 제공합니다.

## 기술 스택

- **프레임워크**: Vite + React 19 + TypeScript 5.9
- **패키지 매니저**: npm
- **스타일링**: TailwindCSS v4 (Vite 플러그인)
- **UI 컴포넌트**: Shadcn UI (New York 스타일)
- **라우팅**: React Router v7
- **상태 관리**: Zustand (devtools 및 persist 미들웨어 포함)
- **서버 상태 관리**: Tanstack Query (React Query v5)
- **HTTP 클라이언트**: ky
- **백엔드**: Supabase
- **테스팅**: Vitest + React Testing Library + jsdom

## 명령어

### 개발

```bash
npm run dev           # 개발 서버 실행
npm run build         # TypeScript 검사 + 프로덕션 빌드
npm run preview       # 프로덕션 빌드 미리보기
npm run lint          # ESLint 실행
```

### 테스트

```bash
npm run test          # watch 모드로 테스트 실행
npm run test:ui       # Vitest UI 열기
npm run test:coverage # 커버리지 리포트 생성
```

### 유틸리티

```bash
npm run clean         # dist 폴더 삭제
npm run compile       # clean, build, preview 순차 실행 (npm-run-all 사용)
```

### Shadcn 컴포넌트

```bash
npx shadcn@latest add <component>     # Shadcn 컴포넌트 추가
```

## 아키텍처

이 프로젝트는 엄격한 의존성 규칙을 가진 **Feature-Sliced Design (FSD)** 아키텍처를 따릅니다.

### FSD 레이어 구조

```
src/
├── app/         # 애플리케이션 초기화 및 전역 설정
├── pages/       # 라우트 페이지 (컴포지션 레이어)
├── widgets/     # 복잡하고 독립적인 UI 블록
├── features/    # 사용자 인터랙션이 있는 비즈니스 기능
├── entities/    # 비즈니스 엔티티 (데이터 모델)
└── shared/      # 재사용 가능한 유틸리티 및 컴포넌트
```

### 의존성 규칙

**상위 → 하위 방향만 가능. 상위 레이어는 하위 레이어를 import 할 수 있지만, 그 반대는 불가능합니다.**

- `app` → 모든 레이어에서 import 가능
- `pages` → widgets, features, entities, shared
- `widgets` → features, entities, shared
- `features` → entities, shared
- `entities` → shared
- `shared` → 다른 shared 모듈만 가능

**같은 레벨 간 import는 금지됩니다** (예: features는 다른 features를 import 할 수 없음).

### Path Alias

`vite.config.ts`와 `tsconfig.app.json`에 설정되어 있습니다:

```typescript
@/          -> src/
@app/       -> src/app/
@pages/     -> src/pages/
@widgets/   -> src/widgets/
@features/  -> src/features/
@entities/  -> src/entities/
@shared/    -> src/shared/
```

## 주요 아키텍처 패턴

### 1. 라우팅 (src/app/router/routes.tsx)

전역 Layout과 함께 **중첩 라우팅** 사용:

```typescript
createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // 모든 라우트를 감쌈
    errorElement: <ErrorPage />, // 전역 에러 바운더리
    children: [
      { index: true, element: <HomePage /> },
      // 여기에 새 라우트를 children으로 추가
    ],
  },
]);
```

새 페이지 추가 방법:

1. `src/pages/<page-name>/`에 컴포넌트 생성
2. 파일 확장자를 포함하여 직접 import: `import AboutPage from '@/pages/about/AboutPage'`
3. children 라우트로 추가 (root 레벨이 아님)

### 2. 상태 관리 (src/app/store/store.ts)

미들웨어를 포함한 Zustand 스토어:

```typescript
export const useGlobalStore = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        /* state */
      }),
      { name: 'global-storage' } // localStorage 키
    ),
    { name: 'GlobalStore', enabled: import.meta.env.DEV }
  )
);
```

- `devtools`: Redux DevTools 연동 (개발 환경에서만)
- `persist`: localStorage에 자동 저장
- 상태 업데이트 시 디버깅을 위한 명확한 액션 이름 사용

### 3. HTTP 클라이언트 (src/shared/api/http-client.ts)

사전 구성된 ky 클라이언트:

- 네트워크 에러 시 자동 재시도 (2회)
- 10초 타임아웃
- Bearer 토큰 인증 (`localStorage.getItem('auth_token')`)
- 401 응답 시 자동 로그아웃

환경변수의 Base URL: `VITE_API_BASE_URL` (기본값: `http://localhost:3000/api`)

헬퍼 함수: `get<T>()`, `post<T, D>()`, `put<T, D>()`, `del<T>()`

### 4. Tanstack Query 설정 (src/app/index.tsx)

서버 상태 관리를 위한 Tanstack Query (React Query) 전역 설정:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,           // 즉시 stale 상태로 전환
      gcTime: 1_000 * 60 * 5, // 5분간 캐싱
    },
  },
});
```

주요 설정:
- `staleTime: 0`: 데이터를 즉시 stale 상태로 간주하여 리페칭 유도
- `gcTime: 5분`: 사용하지 않는 캐시 데이터를 5분간 메모리에 보관
- React Query Devtools 설치됨 (`@tanstack/react-query-devtools`)

사용 예시:
```typescript
// useQuery 사용
const { data, isLoading, error } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});

// useMutation 사용
const mutation = useMutation({
  mutationFn: createTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

### 5. Supabase 클라이언트 (src/shared/api/supabase-client.ts)

필수 환경변수:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Supabase 기능 사용 전에 `.env.example`을 `.env`로 복사하고 값을 채워야 합니다.

### 6. Shadcn 설정 (components.json)

FSD에 맞춘 커스텀 alias:

```json
{
  "components": "@/shared/ui",
  "utils": "@/shared/lib/utils",
  "ui": "@/shared/ui"
}
```

새로운 Shadcn 컴포넌트는 `src/shared/ui/`에 설치됩니다.

## 중요한 컨벤션

### React 컴포넌트

**함수 선언식** (화살표 함수 아님)을 사용하고 마지막에 `export default`:

```typescript
function MyComponent() {
  return <div>...</div>;
}

export default MyComponent;
```

### Import 경로

**항상 직접 파일 import 사용** (barrel export/index.ts 금지):

```typescript
// ✅ 올바름
import Layout from '@/widgets/layout/Layout';
import HomePage from '@/pages/home/HomePage';

// ❌ 잘못됨
import Layout from '@/widgets/layout';
import HomePage from '@/pages/home';
```

### TailwindCSS v4

**`tailwind.config.js` 불필요.** CSS에서 Tailwind를 직접 import:

```css
/* src/app/styles/main.css */
@import 'tailwindcss';
```

커스텀 테마 값은 동일 파일에 정의된 CSS 변수를 사용합니다.

## 테스팅

테스트는 `@testing-library/react`와 함께 jsdom 환경을 사용합니다. 설정 파일: `src/shared/config/test-setup.ts`

테스트 파일 패턴: `**/*.{test,spec}.{ts,tsx}`

커버리지 제외 대상:

- `node_modules/`
- `src/shared/config/`
- `**/*.config.ts`
- `**/*.d.ts`

## 환경변수

`.env.example`에서 `.env` 생성:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

코드에서 접근: `import.meta.env.VITE_*`

## Git 커밋 컨벤션

이 프로젝트는 **Conventional Commits** 규칙을 따르며, Husky + commitlint로 커밋 메시지를 자동 검증합니다.

### 커밋 메시지 구조

```
<type>: <subject>

[optional body]

[optional footer]
```

### Type 종류

| Type | 설명 | 예시 |
|------|------|------|
| **feat** | 새로운 기능 추가 | `feat: 사용자 로그인 기능 추가` |
| **fix** | 버그 수정 | `fix: 로그인 시 에러 처리 개선` |
| **docs** | 문서 수정 | `docs: README에 설치 방법 추가` |
| **style** | 코드 포맷팅 (기능 변경 없음) | `style: 코드 포맷팅 적용` |
| **refactor** | 리팩토링 (기능 변경 없음) | `refactor: 인증 로직 분리` |
| **perf** | 성능 개선 | `perf: 이미지 로딩 최적화` |
| **test** | 테스트 추가/수정 | `test: 로그인 컴포넌트 테스트 추가` |
| **chore** | 빌드, 패키지 매니저, 설정 수정 | `chore: ESLint 설정 업데이트` |
| **revert** | 커밋 되돌리기 | `revert: feat 커밋 되돌림` |
| **ci** | CI 설정 파일 수정 | `ci: GitHub Actions 워크플로우 추가` |
| **build** | 빌드 시스템 수정 | `build: Vite 설정 변경` |
| **init** | 프로젝트 초기 설정 | `init: 프로젝트 초기 설정 완료` |

### 작성 규칙

1. **type은 영어 소문자**만 사용
2. **subject는 한글 가능** (최대 100자)
3. subject는 **마침표(.)로 끝나지 않음**
4. body와 footer는 선택사항

### 예시

#### 기본 커밋
```bash
git commit -m "feat: 다크모드 토글 기능 추가"
```

#### 상세 설명이 있는 커밋
```bash
git commit -m "feat: 다크모드 토글 기능 추가

사용자가 설정에서 다크모드를 켜고 끌 수 있도록 기능 추가
- Zustand 스토어에 theme 상태 추가
- 로컬스토리지에 자동 저장
- 시스템 설정 감지 기능 포함"

ISSUE #123
```

#### Breaking Change (호환성 깨지는 변경)
```bash
git commit -m "feat!: 인증 API 버전 2로 업그레이드

BREAKING CHANGE: 기존 v1 API가 제거되었습니다.
모든 API 호출을 v2로 마이그레이션 필요"
```

### 자동화 기능

#### 1. 브랜치명 자동 추가 (.husky/prepare-commit-msg)

브랜치명에서 prefix를 제거하고 자동으로 커밋 메시지에 추가됩니다:

```bash
# 브랜치: feature/login
# 커밋 시 자동으로 변환 →
[login] feat: 로그인 UI 구현
```

#### 2. 이슈 번호 자동 추출

브랜치명에 이슈 번호가 있으면 자동으로 추출됩니다:

```bash
# 브랜치: feature/issue/123/yj
# 커밋 시 자동으로 변환 →
ISSUE #123
```

#### 3. 커밋 메시지 검증 (.husky/commit-msg)

잘못된 형식의 커밋 메시지는 자동으로 차단됩니다:

```bash
# ❌ type 없음
git commit -m "로그인 기능 추가"
# 에러: type-empty

# ❌ type 대문자
git commit -m "FEAT: 로그인 기능 추가"
# 에러: type-case

# ❌ subject 너무 김 (100자 초과)
git commit -m "feat: 매우매우매우...긴...메시지..."
# 에러: header-max-length

# ✅ 올바른 형식
git commit -m "feat: 로그인 기능 추가"
```

### Git Hooks

| Hook | 실행 시점 | 동작 |
|------|-----------|------|
| **pre-commit** | 커밋 전 | lint-staged 실행 → Biome으로 staged 파일 검사/포맷 |
| **prepare-commit-msg** | 커밋 메시지 작성 전 | 브랜치명, 이슈 번호 자동 추가 |
| **commit-msg** | 커밋 메시지 작성 후 | commitlint로 메시지 형식 검증 |
| **pre-push** | push 전 | TypeScript 타입 체크, Biome 린트, 테스트 실행 (실패 시 push 차단) |
| **post-merge** | merge 후 | ① 의존성 자동 설치 ② 소스 코드/설정 파일 변경 시 빌드 캐시 정리 및 자동 빌드 |
| **post-checkout** | 브랜치 전환 후 | 의존성 파일 변경 감지 시 자동으로 npm install 실행 |

#### 상세 설명

**품질 검사 Hooks (pre-commit, pre-push)**
- `pre-commit`: staged 파일에 대해 Biome 검사 및 자동 포맷팅
- `pre-push`: push 전 전체 코드베이스에 대해 품질 검사
  - TypeScript 컴파일 체크 (`tsc -b --noEmit`)
  - Biome 린트 검사 (`npm run lint`)
  - 테스트 실행 (`npm run test --run`)
  - 모든 검사를 통과해야만 push 가능

**커밋 메시지 Hooks (prepare-commit-msg, commit-msg)**
- `prepare-commit-msg`: 브랜치명과 이슈 번호를 커밋 메시지에 자동 추가
- `commit-msg`: Conventional Commits 형식 검증

**의존성 관리 및 빌드 Hooks (post-merge, post-checkout)**
- `post-merge`: merge 후 다음 작업을 자동으로 수행
  - **의존성 자동 설치**: `package.json` 또는 `package-lock.json` 변경 시 `npm install` 실행
  - **빌드 캐시 정리 및 자동 빌드**: 소스 코드(`src/`) 또는 설정 파일(`vite.config.*`, `tsconfig*.json`) 변경 시
    - `dist/`, `.vite/`, `node_modules/.vite/` 캐시 삭제
    - `npm run build` 자동 실행
    - 빌드 실패 시 경고만 표시하고 merge 계속 진행
- `post-checkout`: 브랜치 전환 시 의존성 파일(`package.json`, `package-lock.json`) 변경을 감지하고 자동으로 `npm install` 실행

### Husky 명령어

```bash
# Git hooks 재설치
npm run prepare

# 특정 hook 비활성화 (임시)
HUSKY=0 git commit -m "..."

# commitlint 수동 테스트
echo "feat: 테스트 메시지" | npm exec commitlint
```

### 설정 파일

- **commitlint.config.js**: 커밋 메시지 검증 규칙
- **.husky/pre-commit**: 커밋 전 lint-staged 실행
- **.husky/prepare-commit-msg**: 브랜치명/이슈 번호 자동 추가
- **.husky/commit-msg**: 커밋 메시지 형식 검증
- **.husky/pre-push**: push 전 품질 검사 (타입 체크, 린트, 테스트)
- **.husky/post-merge**: merge 후 의존성 자동 설치 + 빌드 캐시 정리 및 자동 빌드
- **.husky/post-checkout**: 브랜치 전환 후 의존성 자동 설치
- **package.json > lint-staged**: staged 파일 검사 설정
