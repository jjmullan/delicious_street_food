---
description: axe-core로 웹 접근성(a11y)을 자동 검증하고 커스텀 설정으로 결과를 분석합니다
---

# axe-core 기반 웹 접근성 자동 검증

이 스킬은 axe-core를 사용하여 프로젝트의 웹 접근성을 자동으로 검증합니다.
사용자가 원하는 검증 기준, 범위, 출력 형식을 세밀하게 커스터마이징할 수 있습니다.

## 검증 기준 출처

- **axe-core**: https://github.com/dequelabs/axe-core (Deque Systems의 접근성 엔진)
- **WCAG 2.0/2.1/2.2**: https://www.w3.org/WAI/WCAG22/quickref/
- **Section 508**: https://www.section508.gov/
- **EN 301 549**: 유럽 접근성 표준

---

## 작업 프로세스

### 1단계: 환경 확인 및 axe-core 설치

**중요**: 먼저 axe-core가 설치되어 있는지 확인합니다.

```bash
# package.json에서 axe-core 확인
grep "axe-core" package.json
```

**설치되어 있지 않은 경우:**
```bash
npm install --save-dev axe-core
```

---

### 2단계: 사용자에게 검증 옵션 질문

다음 옵션들을 **AskUserQuestion 도구를 사용하여** 사용자에게 질문합니다.

#### 질문 1: 검증 기준 (runOnly)

**Question**: "어떤 접근성 기준으로 검증하시겠습니까?"

**Options**:
1. **WCAG 2.1 AA (권장)** - 가장 일반적인 웹 접근성 표준
2. **WCAG 2.2 AA** - 최신 표준 (2023년 발표)
3. **WCAG 2.0 Level A** - 기본 수준
4. **WCAG 2.0 Level AAA** - 가장 엄격한 수준
5. **Best Practices** - 권장 사례만
6. **전체 규칙** - 모든 규칙 실행
7. **커스텀** - 사용자가 직접 태그/규칙 지정

**매핑**:
- WCAG 2.1 AA → `['wcag2aa', 'wcag21aa']`
- WCAG 2.2 AA → `['wcag2aa', 'wcag21aa', 'wcag22aa']`
- WCAG 2.0 Level A → `['wcag2a']`
- WCAG 2.0 Level AAA → `['wcag2aaa']`
- Best Practices → `['best-practice']`
- 전체 규칙 → `runOnly` 옵션 제거
- 커스텀 → 추가 질문으로 태그/규칙 입력받기

#### 질문 2: 검증 범위 (context)

**Question**: "어떤 범위를 검증하시겠습니까?"

**Options**:
1. **전체 페이지** - document 전체 (기본값)
2. **특정 요소만** - CSS 선택자로 지정 (예: `#app`, `.main-content`)
3. **특정 영역 제외** - 광고, 외부 위젯 등 제외

사용자가 2번 또는 3번 선택 시 추가 입력받기:
- "CSS 선택자를 입력해주세요 (예: #app, .main-content)"
- "제외할 선택자를 입력해주세요 (예: .advertisement, iframe#ads)"

#### 질문 3: 결과 유형 (resultTypes)

**Question**: "어떤 결과를 확인하시겠습니까?"

**Options** (multiSelect: true):
1. **위반 사항 (violations)** - 반드시 수정해야 할 항목
2. **수동 검토 필요 (incomplete)** - 자동 판단 불가, 직접 확인 필요
3. **통과 항목 (passes)** - 정상적으로 준수하는 항목
4. **적용 불가 (inapplicable)** - 해당 규칙이 적용되지 않는 항목

**기본값**: `['violations']`

#### 질문 4: 추가 옵션

**Question**: "추가 옵션을 선택해주세요"

**Options** (multiSelect: true):
1. **XPath 포함** - 요소 위치를 XPath로도 표시
2. **전체 경로 포함 (ancestry)** - DOM 전체 경로 표시
3. **iframe 포함** - iframe 내부도 검사
4. **성능 측정** - 각 규칙 실행 시간 측정
5. **요소 참조 포함** - 실제 DOM 요소 참조 반환

**매핑**:
- XPath 포함 → `xpath: true`
- 전체 경로 포함 → `ancestry: true`
- iframe 포함 → `iframes: true` (기본값)
- 성능 측정 → `performanceTimer: true`
- 요소 참조 포함 → `elementRef: true`

#### 질문 5: 출력 형식

**Question**: "결과를 어떤 형식으로 출력하시겠습니까?"

**Options**:
1. **요약 보고서** - 심각도별 개수와 주요 위반사항만
2. **상세 보고서** - 모든 위반사항과 해결 방법
3. **JSON 파일** - 결과를 JSON 파일로 저장
4. **HTML 리포트** - HTML 형식의 시각적 보고서

---

### 3단계: axe-core 검증 스크립트 생성 및 실행

사용자의 선택에 따라 다음과 같은 스크립트를 생성합니다.

#### 파일 위치: `scripts/check-a11y.js`

```javascript
import axe from 'axe-core';
import fs from 'fs';

// 사용자 선택 옵션 (동적 생성)
const context = {{CONTEXT_VALUE}}; // document 또는 { include: [...], exclude: [...] }

const options = {
  runOnly: {{RUNONLY_VALUE}}, // ['wcag2aa', 'wcag21aa'] 등
  resultTypes: {{RESULTTYPES_VALUE}}, // ['violations'] 등
  xpath: {{XPATH_VALUE}}, // true/false
  ancestry: {{ANCESTRY_VALUE}}, // true/false
  iframes: {{IFRAMES_VALUE}}, // true/false
  performanceTimer: {{PERFORMANCETIMER_VALUE}}, // true/false
  elementRef: {{ELEMENTREF_VALUE}} // true/false
};

// 검증 실행
async function runAccessibilityCheck() {
  try {
    console.log('🔍 웹 접근성 검증을 시작합니다...\n');

    const results = await axe.run(context, options);

    // 결과 출력
    printResults(results);

    // JSON 파일 저장 (옵션)
    if ({{SAVE_JSON}}) {
      saveResultsAsJson(results);
    }

    // HTML 리포트 생성 (옵션)
    if ({{SAVE_HTML}}) {
      generateHtmlReport(results);
    }

  } catch (error) {
    console.error('❌ 검증 중 오류 발생:', error);
    process.exit(1);
  }
}

// 결과 출력 함수
function printResults(results) {
  const { violations, passes, incomplete, inapplicable } = results;

  console.log('═══════════════════════════════════════════════');
  console.log('        ✅ 웹 접근성 검증 결과');
  console.log('═══════════════════════════════════════════════\n');

  console.log(`📊 검증 정보`);
  console.log(`URL: ${results.url}`);
  console.log(`검증 시간: ${results.timestamp}`);
  console.log(`axe-core 버전: ${results.testEngine.version}\n`);

  // 위반사항
  if (violations && violations.length > 0) {
    console.log(`\n🚨 위반 사항: ${violations.length}개\n`);

    // 심각도별 분류
    const critical = violations.filter(v => v.impact === 'critical');
    const serious = violations.filter(v => v.impact === 'serious');
    const moderate = violations.filter(v => v.impact === 'moderate');
    const minor = violations.filter(v => v.impact === 'minor');

    console.log(`심각도별 분류:`);
    console.log(`  🔴 Critical: ${critical.length}개`);
    console.log(`  🟠 Serious: ${serious.length}개`);
    console.log(`  🟡 Moderate: ${moderate.length}개`);
    console.log(`  🟢 Minor: ${minor.length}개\n`);

    // 상세 출력 여부에 따라
    if ({{DETAILED_OUTPUT}}) {
      violations.forEach((violation, index) => {
        console.log(`\n[${index + 1}] ${getImpactIcon(violation.impact)} ${violation.help}`);
        console.log(`    ID: ${violation.id}`);
        console.log(`    영향도: ${violation.impact || 'unknown'}`);
        console.log(`    태그: ${violation.tags.join(', ')}`);
        console.log(`    설명: ${violation.description}`);
        console.log(`    자세히: ${violation.helpUrl}`);
        console.log(`    영향받는 요소: ${violation.nodes.length}개`);

        violation.nodes.forEach((node, nodeIndex) => {
          console.log(`\n    [요소 ${nodeIndex + 1}]`);
          console.log(`    HTML: ${node.html}`);
          console.log(`    선택자: ${node.target.join(' ')}`);

          if (node.xpath && {{XPATH_VALUE}}) {
            console.log(`    XPath: ${node.xpath.join(' ')}`);
          }

          if (node.ancestry && {{ANCESTRY_VALUE}}) {
            console.log(`    경로: ${node.ancestry.join(' ')}`);
          }

          if (node.failureSummary) {
            console.log(`    문제: ${node.failureSummary}`);
          }

          // 해결 방법
          console.log(`\n    💡 해결 방법:`);
          if (node.any.length > 0) {
            console.log(`       다음 중 하나라도 수정:`);
            node.any.forEach(check => {
              console.log(`       - ${check.message}`);
            });
          }
          if (node.all.length > 0) {
            console.log(`       모두 수정 필요:`);
            node.all.forEach(check => {
              console.log(`       - ${check.message}`);
            });
          }
          if (node.none.length > 0) {
            console.log(`       다음을 제거해야 함:`);
            node.none.forEach(check => {
              console.log(`       - ${check.message}`);
            });
          }
        });

        console.log(`\n${'─'.repeat(60)}`);
      });
    } else {
      // 요약 출력
      violations.slice(0, 5).forEach((violation, index) => {
        console.log(`${index + 1}. ${getImpactIcon(violation.impact)} ${violation.help}`);
        console.log(`   영향받는 요소: ${violation.nodes.length}개 | ${violation.helpUrl}\n`);
      });

      if (violations.length > 5) {
        console.log(`... 외 ${violations.length - 5}개 위반사항 (상세 보기는 --detailed 옵션 사용)\n`);
      }
    }
  } else {
    console.log('\n✅ 위반 사항이 없습니다!\n');
  }

  // 수동 검토 필요
  if (incomplete && incomplete.length > 0) {
    console.log(`\n⚠️  수동 검토 필요: ${incomplete.length}개\n`);

    incomplete.forEach((item, index) => {
      console.log(`${index + 1}. ${item.help}`);
      console.log(`   ${item.description}`);
      console.log(`   영향받는 요소: ${item.nodes.length}개 | ${item.helpUrl}\n`);
    });
  }

  // 통과 항목
  if (passes && passes.length > 0) {
    console.log(`\n✅ 통과: ${passes.length}개 규칙\n`);
  }

  // 적용 불가
  if (inapplicable && inapplicable.length > 0) {
    console.log(`\nℹ️  적용 불가: ${inapplicable.length}개 규칙\n`);
  }

  // 성능 정보
  if ({{PERFORMANCETIMER_VALUE}}) {
    console.log(`\n⏱️  성능 측정 결과`);
    // axe-core의 성능 로그는 콘솔에 자동 출력됨
  }

  console.log('\n═══════════════════════════════════════════════\n');
}

// 심각도 아이콘
function getImpactIcon(impact) {
  const icons = {
    critical: '🔴',
    serious: '🟠',
    moderate: '🟡',
    minor: '🟢'
  };
  return icons[impact] || '⚪';
}

// JSON 저장
function saveResultsAsJson(results) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `a11y-report-${timestamp}.json`;

  fs.writeFileSync(filename, JSON.stringify(results, null, 2));
  console.log(`\n💾 JSON 리포트 저장됨: ${filename}\n`);
}

// HTML 리포트 생성
function generateHtmlReport(results) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `a11y-report-${timestamp}.html`;

  const html = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>웹 접근성 검증 리포트</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    }
    .card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .violation {
      background: white;
      padding: 20px;
      margin-bottom: 15px;
      border-radius: 8px;
      border-left: 4px solid #e53e3e;
    }
    .impact-critical { border-left-color: #e53e3e; }
    .impact-serious { border-left-color: #dd6b20; }
    .impact-moderate { border-left-color: #d69e2e; }
    .impact-minor { border-left-color: #38a169; }
    .nodes {
      margin-top: 15px;
      padding-left: 20px;
    }
    .node {
      background: #f7fafc;
      padding: 10px;
      margin: 10px 0;
      border-radius: 4px;
      font-size: 14px;
    }
    code {
      background: #2d3748;
      color: #68d391;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>✅ 웹 접근성 검증 리포트</h1>
    <p>검증 시간: ${results.timestamp}</p>
    <p>URL: ${results.url}</p>
    <p>axe-core 버전: ${results.testEngine.version}</p>
  </div>

  <div class="summary">
    <div class="card">
      <h3>🔴 Critical</h3>
      <h2>${results.violations.filter(v => v.impact === 'critical').length}</h2>
    </div>
    <div class="card">
      <h3>🟠 Serious</h3>
      <h2>${results.violations.filter(v => v.impact === 'serious').length}</h2>
    </div>
    <div class="card">
      <h3>🟡 Moderate</h3>
      <h2>${results.violations.filter(v => v.impact === 'moderate').length}</h2>
    </div>
    <div class="card">
      <h3>🟢 Minor</h3>
      <h2>${results.violations.filter(v => v.impact === 'minor').length}</h2>
    </div>
  </div>

  <h2>위반 사항 상세</h2>
  ${results.violations.map((v, i) => `
    <div class="violation impact-${v.impact}">
      <h3>[${i + 1}] ${v.help}</h3>
      <p><strong>ID:</strong> ${v.id}</p>
      <p><strong>영향도:</strong> ${v.impact || 'unknown'}</p>
      <p><strong>설명:</strong> ${v.description}</p>
      <p><strong>태그:</strong> ${v.tags.join(', ')}</p>
      <p><a href="${v.helpUrl}" target="_blank">자세히 보기 →</a></p>

      <div class="nodes">
        <strong>영향받는 요소 (${v.nodes.length}개):</strong>
        ${v.nodes.map((node, ni) => `
          <div class="node">
            <strong>[요소 ${ni + 1}]</strong><br>
            <code>${node.html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code><br>
            <strong>선택자:</strong> <code>${node.target.join(' ')}</code><br>
            ${node.failureSummary ? `<strong>문제:</strong> ${node.failureSummary}` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('')}

  ${results.incomplete && results.incomplete.length > 0 ? `
    <h2>⚠️ 수동 검토 필요 (${results.incomplete.length}개)</h2>
    ${results.incomplete.map((item, i) => `
      <div class="card">
        <h4>[${i + 1}] ${item.help}</h4>
        <p>${item.description}</p>
        <p><a href="${item.helpUrl}" target="_blank">자세히 보기 →</a></p>
      </div>
    `).join('')}
  ` : ''}
</body>
</html>
  `;

  fs.writeFileSync(filename, html);
  console.log(`\n📄 HTML 리포트 저장됨: ${filename}\n`);
}

// 실행
runAccessibilityCheck();
```

---

### 4단계: 브라우저 환경에서 실행

axe-core는 브라우저 환경에서 실행되어야 하므로, 다음 방법 중 하나를 사용합니다.

#### 방법 A: Vite 개발 서버에 통합

**파일**: `src/utils/a11y-check.ts`

```typescript
import axe from 'axe-core';

export async function runA11yCheck() {
  if (import.meta.env.DEV) {
    const context = {{CONTEXT_VALUE}};
    const options = {
      runOnly: {{RUNONLY_VALUE}},
      resultTypes: {{RESULTTYPES_VALUE}},
      xpath: {{XPATH_VALUE}},
      ancestry: {{ANCESTRY_VALUE}},
      iframes: {{IFRAMES_VALUE}},
      performanceTimer: {{PERFORMANCETIMER_VALUE}}
    };

    const results = await axe.run(context, options);

    // 콘솔에 출력
    console.group('🔍 웹 접근성 검증 결과');
    console.log(`위반 사항: ${results.violations.length}개`);

    if (results.violations.length > 0) {
      results.violations.forEach(v => {
        console.groupCollapsed(`${getImpactIcon(v.impact)} ${v.help}`);
        console.log(`ID: ${v.id}`);
        console.log(`영향도: ${v.impact}`);
        console.log(`영향받는 요소: ${v.nodes.length}개`);
        console.log(`해결 방법: ${v.helpUrl}`);

        v.nodes.forEach((node, i) => {
          console.groupCollapsed(`요소 ${i + 1}`);
          console.log('HTML:', node.html);
          console.log('선택자:', node.target);
          console.log('문제:', node.failureSummary);
          console.groupEnd();
        });

        console.groupEnd();
      });
    } else {
      console.log('✅ 위반 사항이 없습니다!');
    }

    console.groupEnd();

    return results;
  }
}

function getImpactIcon(impact: string): string {
  const icons: Record<string, string> = {
    critical: '🔴',
    serious: '🟠',
    moderate: '🟡',
    minor: '🟢'
  };
  return icons[impact] || '⚪';
}
```

**사용법** (`src/app/index.tsx`):

```typescript
import { runA11yCheck } from '@/shared/utils/a11y-check';

useEffect(() => {
  // 페이지 로드 후 검증
  const timer = setTimeout(() => {
    runA11yCheck();
  }, 1000); // DOM 완전히 로드될 때까지 대기

  return () => clearTimeout(timer);
}, []);
```

#### 방법 B: 별도 HTML 페이지로 테스트

**파일**: `test-a11y.html`

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>접근성 테스트</title>
</head>
<body>
  <h1>접근성 테스트 페이지</h1>
  <p>이 페이지는 개발 서버를 통해 접근해주세요.</p>
  <button id="run-test">검증 실행</button>
  <pre id="results"></pre>

  <script type="module">
    import axe from 'axe-core';

    document.getElementById('run-test').addEventListener('click', async () => {
      const results = await axe.run({{CONTEXT_VALUE}}, {
        runOnly: {{RUNONLY_VALUE}},
        resultTypes: {{RESULTTYPES_VALUE}}
      });

      document.getElementById('results').textContent = JSON.stringify(results, null, 2);
    });
  </script>
</body>
</html>
```

#### 방법 C: Playwright/Puppeteer로 자동화

**파일**: `scripts/a11y-test.mjs`

```javascript
import { chromium } from 'playwright';
import axeCore from 'axe-core';
import fs from 'fs';

async function testAccessibility() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 개발 서버 접속
  await page.goto('http://localhost:5173');

  // axe-core 주입
  await page.evaluate(axeCore.source);

  // 검증 실행
  const results = await page.evaluate(async () => {
    return await axe.run({{CONTEXT_VALUE}}, {
      runOnly: {{RUNONLY_VALUE}},
      resultTypes: {{RESULTTYPES_VALUE}}
    });
  });

  // 결과 출력
  console.log(`위반 사항: ${results.violations.length}개`);

  // JSON 저장
  fs.writeFileSync('a11y-results.json', JSON.stringify(results, null, 2));

  await browser.close();
}

testAccessibility();
```

**package.json에 스크립트 추가**:
```json
{
  "scripts": {
    "test:a11y": "node scripts/a11y-test.mjs"
  }
}
```

---

### 5단계: 결과 해석 및 수정 가이드

검증 결과를 바탕으로 다음과 같이 조치합니다.

#### 심각도별 우선순위

1. **🔴 Critical** - 즉시 수정 필수
   - 스크린 리더 사용 불가
   - 키보드 접근 불가
   - 폼 제출 불가 등

2. **🟠 Serious** - 빠른 시일 내 수정
   - 색상 대비 부족
   - alt 텍스트 누락
   - label 연결 누락 등

3. **🟡 Moderate** - 점진적 개선
   - 시맨틱 HTML 미사용
   - ARIA 속성 누락
   - 제목 구조 문제 등

4. **🟢 Minor** - 선택적 개선
   - 권장사항
   - 최적화 기회

#### 자주 발생하는 위반사항 해결법

**1. color-contrast (색상 대비)**
```tsx
// ❌ 잘못된 예
<button className="text-gray-400 bg-gray-300">클릭</button>

// ✅ 올바른 예 (4.5:1 이상)
<button className="text-gray-900 bg-gray-100">클릭</button>
```

**2. image-alt (이미지 대체 텍스트)**
```tsx
// ❌ 잘못된 예
<img src="logo.png" />

// ✅ 올바른 예
<img src="logo.png" alt="회사 로고" />

// ✅ 장식용 이미지
<img src="divider.png" alt="" />
```

**3. label (폼 라벨)**
```tsx
// ❌ 잘못된 예
<input type="text" placeholder="이름" />

// ✅ 올바른 예
<label htmlFor="name">이름</label>
<input id="name" type="text" />
```

**4. button-name (버튼 이름)**
```tsx
// ❌ 잘못된 예
<button><IconClose /></button>

// ✅ 올바른 예
<button aria-label="닫기">
  <IconClose />
</button>
```

**5. link-name (링크 이름)**
```tsx
// ❌ 잘못된 예
<a href="/more">더보기</a>

// ✅ 올바른 예
<a href="/products">상품 목록 더보기</a>
```

---

## 출력 형식

검증 결과는 다음 형식으로 터미널에 출력됩니다:

```
═══════════════════════════════════════════════
        ✅ 웹 접근성 검증 결과
═══════════════════════════════════════════════

📊 검증 정보
URL: http://localhost:5173
검증 시간: 2026-01-12T10:30:00.000Z
axe-core 버전: 4.11.0

🚨 위반 사항: 12개

심각도별 분류:
  🔴 Critical: 2개
  🟠 Serious: 5개
  🟡 Moderate: 3개
  🟢 Minor: 2개

[1] 🟠 Elements must have sufficient color contrast
    ID: color-contrast
    영향도: serious
    태그: wcag2aa, wcag21aa, cat.color
    설명: Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds
    자세히: https://dequeuniversity.com/rules/axe/4.11/color-contrast
    영향받는 요소: 3개

    [요소 1]
    HTML: <button class="text-gray-400 bg-gray-300">제출</button>
    선택자: button.submit
    문제: 대비율 2.1:1은 4.5:1 최소 기준을 충족하지 않습니다

    💡 해결 방법:
       - 전경색과 배경색의 대비를 4.5:1 이상으로 높이세요

────────────────────────────────────────────────

⚠️  수동 검토 필요: 3개

1. Color contrast of text over background image
   배경 이미지 위의 텍스트 대비를 수동으로 확인해주세요
   영향받는 요소: 1개 | https://dequeuniversity.com/...

✅ 통과: 45개 규칙

ℹ️  적용 불가: 23개 규칙

═══════════════════════════════════════════════
```

---

## 주의사항

1. **axe-core는 브라우저 환경에서만 실행됩니다**
   - Node.js에서 직접 실행 불가
   - Playwright, Puppeteer 등 헤드리스 브라우저 필요

2. **모든 접근성 문제를 감지하지는 못합니다**
   - 자동 검증은 약 30-50% 정도만 감지
   - 수동 테스트 (키보드, 스크린 리더) 병행 필요

3. **동적 콘텐츠 검증**
   - 모달, 드롭다운 등은 열린 상태에서 검증
   - 여러 페이지 상태를 각각 검증 필요

4. **성능 고려**
   - 전체 페이지 검증은 느릴 수 있음
   - 개발 중에는 특정 컴포넌트만 검증 권장

5. **CI/CD 통합**
   - Playwright/Puppeteer 기반 스크립트로 자동화
   - PR마다 자동 검증 설정 권장

---

## 참고 자료

- **axe-core GitHub**: https://github.com/dequelabs/axe-core
- **axe-core API 문서**: https://github.com/dequelabs/axe-core/blob/develop/doc/API.md
- **Deque University**: https://dequeuniversity.com/rules/axe/4.11/
- **WCAG 2.2 Quick Reference**: https://www.w3.org/WAI/WCAG22/quickref/
- **WebAIM**: https://webaim.org/
- **The A11Y Project**: https://www.a11yproject.com/

---

## 작업 순서 요약

1. axe-core 설치 확인 및 설치
2. AskUserQuestion으로 사용자 옵션 수집
3. 선택된 옵션으로 검증 스크립트 생성
4. 브라우저 환경에서 검증 실행
5. 결과 분석 및 출력
6. 위반사항 수정 가이드 제공
7. (선택) JSON/HTML 리포트 생성
