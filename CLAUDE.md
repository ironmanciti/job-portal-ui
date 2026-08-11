# CLAUDE.md

이 파일은 Claude Code (`claude.ai/code`)가 이 저장소에서 작업할 때 따라야 할 지침을 제공합니다.

## 명령어

- `npm run dev` — Vite 개발 서버 실행
- `npm run build` — 프로덕션 빌드
- `npm run lint` — ESLint 실행 (flat config, JS/JSX만 대상)
- `npm run preview` — 프로덕션 빌드 미리보기

## 저장소 구조

```text
job-portal-ui/
├── public/               # 정적 자산 (파비콘, 회사 로고)
├── src/
│   ├── components/       # 재사용 가능한 UI 컴포넌트 (Navbar, Footer, Layout, ProtectedRoute 등)
│   ├── context/          # 핵심 React Context: AuthContext, JobContext, ThemeContext
│   ├── contexts/         # 데이터 조회용 Context: JobsDataContext, CompaniesContext
│   ├── data/             # mockData.js — 모든 초기 데이터 (jobs, companies, users)
│   ├── pages/            # 라우트 단위 페이지 컴포넌트
│   │   └── admin/        # 관리자 전용 페이지 (Dashboard, CompanyManagement 등)
│   ├── services/         # 비동기 API 동작을 모의하는 서비스 함수
│   ├── utils/            # 공통 유틸리티 (delay.js)
│   ├── App.jsx           # 루트 컴포넌트 — router + provider tree
│   ├── main.jsx          # 애플리케이션 진입점
│   └── index.css         # 전역 스타일 (Tailwind imports)
├── eslint.config.js      # ESLint flat config
├── vite.config.js        # Vite 설정
└── index.html            # HTML 진입점
```

**작업 위치 안내:**

- 새 페이지 추가 → `src/pages/`에 생성하고 `App.jsx`에 route 등록
- 공통 UI 컴포넌트 → `src/components/`
- 인증 로직 → `src/context/AuthContext.jsx`
- 채용공고/지원 로직 → `src/context/JobContext.jsx`
- Mock 데이터 수정 → `src/data/mockData.js`
- API 모의 처리 → `src/services/`

## Git 규칙

### 브랜치

브랜치 이름은 아래 규칙을 따른다.

feature/add-job-filter-sidebar         # 새로운 기능
fix/employer-route-redirect-loop       # 버그 수정
docs/update-readme                     # 문서 수정
chore/upgrade-dependencies             # 유지보수, 도구, 의존성 작업
refactor/simplify-auth-context         # 코드 리팩토링
style/mobile-job-card-spacing          # UI/스타일 변경


- 모든 신규 작업은 `main` 브랜치에서 분기한다.
- 브랜치는 가능한 한 짧게 유지하고, 작업 준비가 완료되면 PR을 생성한다.
- 병합이 끝난 브랜치는 삭제한다.

### Commit Message

**Conventional Commits** 형식을 따른다.

기본 형식:

<type>: <description>

예시:

feat: 저장한 채용공고 수를 네비게이션 바에 추가
fix: 고용주 라우트의 역할 권한 검사 오류 수정
docs: README에 localStorage 키 설명 추가
chore: react-router를 v7.8로 업그레이드
refactor: 채용공고 카드를 재사용 가능한 컴포넌트로 분리
style: 코드 포맷 및 공백 정리
test: 로그인 기능 테스트 추가
build: 빌드 의존성 설정 변경
ci: GitHub Actions 워크플로 수정

주요 type의 의미:

feat — 새로운 기능 추가
fix — 버그 수정
docs — 문서만 변경
refactor — 기능 변경 없이 코드 구조 개선
test — 테스트 코드 추가 또는 수정
build — 빌드 시스템 또는 외부 의존성 변경
ci — CI/CD 설정 및 스크립트 변경
chore — 위 범주에 포함되지 않는 일반 유지보수 작업
style — 공백, 들여쓰기, 포맷팅 등 코드 동작에 영향을 주지 않는 스타일 변경

작성 규칙:

type은 영어 소문자로 작성한다.
type 뒤의 설명은 한국어로 작성한다.
제목 끝에 마침표를 붙이지 않는다.
제목은 간결하게 작성하고 가능하면 72자 이내로 유지한다.
변경 이유가 명확하지 않은 경우 commit body에 상세 설명을 추가한다.
UI 기능 추가나 화면 디자인 변경을 무조건 style로 분류하지 않는다.
- 새로운 UI 기능 추가 → feat
- UI 오류 수정 → fix
- 코드 포맷만 변경 → style

### Pull Request

- PR 제목은 Commit Message와 동일한 형식을 사용한다.
- PR 설명에는 변경 요약과 테스트 계획을 포함한다.
- 기본 대상 브랜치는 `main`으로 한다.

## 코딩 규칙

### 일반

- **TypeScript 사용 금지** — 전체 프로젝트에서 plain JSX를 사용하며 `.ts`, `.tsx` 파일을 추가하지 않는다.
- **함수형 컴포넌트만 사용** — class component는 사용하지 않는다.
- 컴포넌트는 가능하면 **named export**를 사용한다.
- 각 컴포넌트는 하나의 역할에 집중하도록 유지한다.
- 재사용 가능한 UI는 `src/components/`로 분리한다.

### 스타일링

- **Tailwind CSS utility class만 사용한다.**
- inline style과 CSS module은 사용하지 않는다.
- mobile-first responsive design을 따른다 (`sm:`, `md:`, `lg:` breakpoint 사용).
- Dark mode는 `ThemeContext`를 사용한다.
- Dark mode 구현 시 Tailwind의 `dark:` variant 대신 조건부 class toggling 방식을 사용한다.

### 상태 및 데이터

- 공유 상태는 React Context를 사용한다.
- 외부 state management library는 추가하지 않는다.
- page component에서 데이터를 직접 fetch하지 않는다.
- 데이터 접근은 `src/services/`의 service를 통해 수행한다.
- 모든 비동기 service 호출은 latency simulation을 위해 `delay()`를 사용한다.
- 사용자별 데이터는 기존 key pattern인 `{entity}_{userId}` 형식으로 localStorage에 저장한다.

### Naming

- Component: `PascalCase`  
  예: `JobCard.jsx`
- Variable / Function: `camelCase`
- Constant: `UPPER_SNAKE_CASE`
- File name은 export되는 component 이름과 일치시킨다.  
  예: `JobCard.jsx`는 `JobCard`를 export한다.

### ESLint

`eslint.config.js`의 flat config를 사용한다.

`no-unused-vars` 규칙에서는 대문자 또는 `_`로 시작하는 변수를 무시한다.

```text
varsIgnorePattern: '^[A-Z_]'
```

코드를 수정한 후 commit 전에 반드시 다음 명령을 실행한다.

```bash
npm run lint
```

빌드에 영향을 줄 수 있는 변경인 경우 다음 명령도 실행한다.

```bash
npm run build
```

## 아키텍처

이 프로젝트는 다음 기술을 사용하는 React SPA이다.

- React 19
- Vite 7
- Tailwind CSS 4
- React Router 7
- TypeScript 미사용 — plain JSX만 사용

### 상태 관리

React Context를 두 계층으로 나누어 사용한다.

- **`src/context/`** — 핵심 Context
  - `AuthContext`: 인증, dummy user, localStorage persistence
  - `JobContext`: 지원 내역, 저장한 채용공고, employer job CRUD
  - `ThemeContext`: 테마 관리

- **`src/contexts/`** — 데이터 조회용 Context
  - `JobsDataContext`: 5분 TTL을 사용하는 cached job list
  - `CompaniesContext`: 회사 데이터 관리

`App.jsx`의 Provider 중첩 순서는 다음과 같다.

```text
AuthProvider
→ JobsDataProvider
→ JobProvider
→ CompaniesProvider
→ ThemeProvider
```

이 순서를 임의로 변경하지 않는다.

### 데이터 계층

현재는 실제 backend 없이 **mock data + localStorage persistence** 방식으로 동작한다.

- 초기 데이터 → `src/data/mockData.js`
- API simulation → `src/services/`
- latency simulation → `src/utils/delay.js`

주요 localStorage key:

```text
jobPortalUser
authToken
registeredUsers
globalPostedJobs
jobApplications_{userId}
savedJobs_{userId}
postedJobs_{userId}
```

### Routing 및 Role

`ProtectedRoute` 컴포넌트를 이용해 세 가지 역할별 접근 권한을 관리한다.

- **`ROLE_JOB_SEEKER`**
  - `profile`
  - `applied-jobs`
  - `saved-jobs`

- **`ROLE_EMPLOYER`**
  - `post-job`
  - `employer/jobs`
  - `job-applicants/:jobId`

- **`ROLE_ADMIN`**
  - `admin/*`
  - 관리자 페이지는 `src/pages/admin/`에 위치한다.

새 route를 추가할 때는 해당 역할의 접근 권한이 올바르게 적용되는지 반드시 확인한다.

### 주요 라이브러리

- Font Awesome — icon
- Lucide React — icon
- `react-toastify` — notification

## 작업 시 기본 원칙

Claude Code가 이 저장소에서 코드를 수정할 때 다음 원칙을 따른다.

1. 작업 전 관련 파일과 기존 구현 방식을 먼저 확인한다.
2. 기존 아키텍처와 코딩 스타일을 최대한 유지한다.
3. 요청 범위를 넘어서는 불필요한 리팩토링을 하지 않는다.
4. 새로운 dependency는 꼭 필요한 경우에만 추가한다.
5. page component에서 직접 API를 호출하지 않는다.
6. 재사용 가능한 UI는 `src/components/`로 분리한다.
7. 코드 변경 후 `npm run lint`를 실행한다.
8. 빌드 영향이 있는 변경은 `npm run build`로 검증한다.
9. TypeScript 파일을 생성하지 않는다.
10. 기존 localStorage key 및 role 구조와의 하위 호환성을 유지한다.
