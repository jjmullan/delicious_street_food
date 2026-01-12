/**
 * axe-core를 사용한 웹 접근성 자동 검증 유틸리티
 * WCAG 2.1 AA 기준으로 검증하고 콘솔에 결과를 출력합니다.
 */
import axe, { type NodeResult, type Result } from 'axe-core';

interface A11yCheckOptions {
	/** 검증할 DOM 요소 또는 선택자 (기본값: document) */
	context?: Document | Element | string;
	/** 검증 기준 태그 (기본값: ['wcag2aa', 'wcag21aa']) */
	runOnly?: string[];
	/** 결과 유형 (기본값: ['violations', 'incomplete', 'passes']) */
	resultTypes?: ('violations' | 'incomplete' | 'passes' | 'inapplicable')[];
	/** HTML 리포트 생성 여부 (기본값: true) */
	generateHtmlReport?: boolean;
	/** 상세 출력 여부 (기본값: false) */
	detailed?: boolean;
}

/**
 * 웹 접근성 검증 실행
 */
export async function runA11yCheck(options: A11yCheckOptions = {}) {
	if (!import.meta.env.DEV) {
		console.warn('⚠️  접근성 검증은 개발 모드에서만 실행됩니다.');
		return null;
	}

	const {
		context = document,
		runOnly = ['wcag2aa', 'wcag21aa'],
		resultTypes = ['violations', 'incomplete', 'passes'],
		generateHtmlReport = true,
		detailed = false,
	} = options;

	try {
		console.log('🔍 웹 접근성 검증을 시작합니다...\n');

		const results = await axe.run(context, {
			runOnly: {
				type: 'tag',
				values: runOnly,
			},
			resultTypes,
			xpath: true, // XPath 포함
			ancestry: false, // 전체 경로는 성능을 위해 비활성화
			iframes: true, // iframe 검사 포함
		});

		// 콘솔에 결과 출력
		printResults(results, detailed);

		// HTML 리포트 생성
		if (generateHtmlReport) {
			generateHtmlReportFile(results);
		}

		return results;
	} catch (error) {
		console.error('❌ 접근성 검증 중 오류 발생:', error);
		return null;
	}
}

/**
 * 검증 결과를 콘솔에 출력
 */
function printResults(results: axe.AxeResults, detailed: boolean) {
	const { violations, passes, incomplete, inapplicable, url, timestamp } = results;

	console.log('═══════════════════════════════════════════════');
	console.log('        ✅ 웹 접근성 검증 결과');
	console.log('═══════════════════════════════════════════════\n');

	console.log('📊 검증 정보');
	console.log(`URL: ${url}`);
	console.log(`검증 시간: ${timestamp}`);
	console.log(`axe-core 버전: ${results.testEngine.version}\n`);

	// 위반사항
	if (violations && violations.length > 0) {
		console.log(`\n🚨 위반 사항: ${violations.length}개\n`);

		// 심각도별 분류
		const critical = violations.filter((v) => v.impact === 'critical');
		const serious = violations.filter((v) => v.impact === 'serious');
		const moderate = violations.filter((v) => v.impact === 'moderate');
		const minor = violations.filter((v) => v.impact === 'minor');

		console.log('심각도별 분류:');
		console.log(`  🔴 Critical: ${critical.length}개`);
		console.log(`  🟠 Serious: ${serious.length}개`);
		console.log(`  🟡 Moderate: ${moderate.length}개`);
		console.log(`  🟢 Minor: ${minor.length}개\n`);

		if (detailed) {
			// 상세 출력
			violations.forEach((violation, index) => {
				console.groupCollapsed(`[${index + 1}] ${getImpactIcon(violation.impact)} ${violation.help}`);
				console.log(`ID: ${violation.id}`);
				console.log(`영향도: ${violation.impact || 'unknown'}`);
				console.log(`태그: ${violation.tags.join(', ')}`);
				console.log(`설명: ${violation.description}`);
				console.log(`자세히: ${violation.helpUrl}`);
				console.log(`영향받는 요소: ${violation.nodes.length}개`);

				violation.nodes.forEach((node, nodeIndex) => {
					console.groupCollapsed(`요소 ${nodeIndex + 1}`);
					console.log('HTML:', node.html);
					console.log('선택자:', node.target.join(' '));

					if (node.xpath) {
						console.log('XPath:', node.xpath.join(' '));
					}

					if (node.failureSummary) {
						console.log('문제:', node.failureSummary);
					}

					// 해결 방법
					console.log('\n💡 해결 방법:');
					printFixSuggestions(node);

					console.groupEnd();
				});

				console.groupEnd();
			});
		} else {
			// 요약 출력 (상위 10개만)
			violations.slice(0, 10).forEach((violation, index) => {
				console.log(`${index + 1}. ${getImpactIcon(violation.impact)} ${violation.help}`);
				console.log(`   영향받는 요소: ${violation.nodes.length}개 | ${violation.helpUrl}\n`);
			});

			if (violations.length > 10) {
				console.log(
					`... 외 ${violations.length - 10}개 위반사항 (콘솔에서 자세히 확인하거나 HTML 리포트를 참고하세요)\n`
				);
			}
		}
	} else {
		console.log('\n✅ 위반 사항이 없습니다!\n');
	}

	// 수동 검토 필요
	if (incomplete && incomplete.length > 0) {
		console.log(`\n⚠️  수동 검토 필요: ${incomplete.length}개\n`);

		incomplete.slice(0, 5).forEach((item, index) => {
			console.log(`${index + 1}. ${item.help}`);
			console.log(`   ${item.description}`);
			console.log(`   영향받는 요소: ${item.nodes.length}개 | ${item.helpUrl}\n`);
		});

		if (incomplete.length > 5) {
			console.log(`... 외 ${incomplete.length - 5}개 항목\n`);
		}
	}

	// 통과 항목
	if (passes && passes.length > 0) {
		console.log(`\n✅ 통과: ${passes.length}개 규칙\n`);
	}

	// 적용 불가
	if (inapplicable && inapplicable.length > 0) {
		console.log(`\nℹ️  적용 불가: ${inapplicable.length}개 규칙\n`);
	}

	console.log('═══════════════════════════════════════════════\n');
}

/**
 * 해결 방법 제안 출력
 */
function printFixSuggestions(node: NodeResult) {
	if (node.any.length > 0) {
		console.log('   다음 중 하나라도 수정:');
		node.any.forEach((check) => {
			console.log(`   - ${check.message}`);
		});
	}
	if (node.all.length > 0) {
		console.log('   모두 수정 필요:');
		node.all.forEach((check) => {
			console.log(`   - ${check.message}`);
		});
	}
	if (node.none.length > 0) {
		console.log('   다음을 제거해야 함:');
		node.none.forEach((check) => {
			console.log(`   - ${check.message}`);
		});
	}
}

/**
 * 심각도 아이콘
 */
function getImpactIcon(impact?: string): string {
	const icons: Record<string, string> = {
		critical: '🔴',
		serious: '🟠',
		moderate: '🟡',
		minor: '🟢',
	};
	return icons[impact || ''] || '⚪';
}

/**
 * HTML 리포트 생성
 */
function generateHtmlReportFile(results: axe.AxeResults) {
	const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
	const filename = `a11y-report-${timestamp}.html`;

	const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>웹 접근성 검증 리포트 - ${results.timestamp}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif;
      background: #f7fafc;
      color: #1a202c;
      line-height: 1.6;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      border-radius: 12px;
      margin-bottom: 30px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header h1 {
      font-size: 32px;
      margin-bottom: 15px;
    }
    .header p {
      opacity: 0.95;
      font-size: 14px;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .card {
      background: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    }
    .card h3 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 10px;
      opacity: 0.7;
    }
    .card .count {
      font-size: 36px;
      font-weight: 700;
    }
    .section {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
      margin-bottom: 20px;
    }
    .section h2 {
      font-size: 24px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e2e8f0;
    }
    .violation {
      background: #fff;
      padding: 25px;
      margin-bottom: 20px;
      border-radius: 8px;
      border-left: 5px solid #e53e3e;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    }
    .violation.impact-critical { border-left-color: #c53030; }
    .violation.impact-serious { border-left-color: #dd6b20; }
    .violation.impact-moderate { border-left-color: #d69e2e; }
    .violation.impact-minor { border-left-color: #38a169; }
    .violation-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    }
    .violation-title {
      font-size: 18px;
      font-weight: 600;
      flex: 1;
    }
    .impact-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .impact-critical { background: #fed7d7; color: #c53030; }
    .impact-serious { background: #feebc8; color: #dd6b20; }
    .impact-moderate { background: #fefcbf; color: #d69e2e; }
    .impact-minor { background: #c6f6d5; color: #38a169; }
    .violation-meta {
      display: flex;
      gap: 20px;
      margin-bottom: 15px;
      font-size: 14px;
      color: #718096;
    }
    .violation-meta span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .violation-description {
      margin-bottom: 15px;
      padding: 15px;
      background: #f7fafc;
      border-radius: 6px;
      font-size: 14px;
    }
    .nodes {
      margin-top: 20px;
    }
    .node {
      background: #f7fafc;
      padding: 15px;
      margin: 15px 0;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }
    .node-header {
      font-weight: 600;
      margin-bottom: 10px;
      color: #2d3748;
    }
    code {
      background: #2d3748;
      color: #68d391;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 13px;
      font-family: 'Monaco', 'Courier New', monospace;
      word-break: break-all;
    }
    .html-snippet {
      background: #1a202c;
      color: #e2e8f0;
      padding: 12px;
      border-radius: 6px;
      margin: 10px 0;
      overflow-x: auto;
      font-size: 13px;
      font-family: 'Monaco', 'Courier New', monospace;
    }
    .fix-suggestions {
      margin-top: 15px;
      padding: 15px;
      background: #edf2f7;
      border-left: 4px solid #4299e1;
      border-radius: 4px;
    }
    .fix-suggestions h4 {
      font-size: 14px;
      margin-bottom: 10px;
      color: #2c5282;
    }
    .fix-suggestions ul {
      list-style: none;
      padding-left: 0;
    }
    .fix-suggestions li {
      padding: 5px 0;
      font-size: 14px;
      color: #2d3748;
    }
    .fix-suggestions li:before {
      content: "→ ";
      color: #4299e1;
      font-weight: bold;
    }
    .link {
      color: #4299e1;
      text-decoration: none;
      font-weight: 500;
    }
    .link:hover {
      text-decoration: underline;
    }
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #718096;
    }
    .empty-state-icon {
      font-size: 64px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ 웹 접근성 검증 리포트</h1>
      <p>검증 시간: ${results.timestamp}</p>
      <p>URL: ${results.url}</p>
      <p>axe-core 버전: ${results.testEngine.version}</p>
      <p>검증 기준: WCAG 2.1 AA</p>
    </div>

    <div class="summary">
      <div class="card">
        <h3>🔴 Critical</h3>
        <div class="count" style="color: #c53030;">${results.violations.filter((v) => v.impact === 'critical').length}</div>
      </div>
      <div class="card">
        <h3>🟠 Serious</h3>
        <div class="count" style="color: #dd6b20;">${results.violations.filter((v) => v.impact === 'serious').length}</div>
      </div>
      <div class="card">
        <h3>🟡 Moderate</h3>
        <div class="count" style="color: #d69e2e;">${results.violations.filter((v) => v.impact === 'moderate').length}</div>
      </div>
      <div class="card">
        <h3>🟢 Minor</h3>
        <div class="count" style="color: #38a169;">${results.violations.filter((v) => v.impact === 'minor').length}</div>
      </div>
    </div>

    ${
			results.violations.length > 0
				? `
    <div class="section">
      <h2>🚨 위반 사항 (${results.violations.length}개)</h2>
      ${results.violations
				.map(
					(v, i) => `
        <div class="violation impact-${v.impact || 'unknown'}">
          <div class="violation-header">
            <div class="violation-title">[${i + 1}] ${v.help}</div>
            <span class="impact-badge impact-${v.impact || 'unknown'}">${v.impact || 'unknown'}</span>
          </div>

          <div class="violation-meta">
            <span>📋 ID: <code>${v.id}</code></span>
            <span>🏷️ 태그: ${v.tags.join(', ')}</span>
            <span>🔢 영향받는 요소: ${v.nodes.length}개</span>
          </div>

          <div class="violation-description">
            ${v.description}
          </div>

          <a href="${v.helpUrl}" target="_blank" class="link">자세한 해결 방법 보기 →</a>

          <div class="nodes">
            <strong>영향받는 요소:</strong>
            ${v.nodes
							.map(
								(node, ni) => `
              <div class="node">
                <div class="node-header">요소 ${ni + 1}</div>
                <div class="html-snippet">${node.html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
                <div style="margin-top: 10px;">
                  <strong>선택자:</strong> <code>${node.target.join(' ')}</code>
                </div>
                ${node.failureSummary ? `<div style="margin-top: 10px; color: #e53e3e;"><strong>문제:</strong> ${node.failureSummary}</div>` : ''}

                ${
									node.any.length > 0 || node.all.length > 0 || node.none.length > 0
										? `
                <div class="fix-suggestions">
                  <h4>💡 해결 방법</h4>
                  ${
										node.any.length > 0
											? `
                  <p><strong>다음 중 하나라도 수정:</strong></p>
                  <ul>
                    ${node.any.map((check) => `<li>${check.message}</li>`).join('')}
                  </ul>
                  `
											: ''
									}
                  ${
										node.all.length > 0
											? `
                  <p><strong>모두 수정 필요:</strong></p>
                  <ul>
                    ${node.all.map((check) => `<li>${check.message}</li>`).join('')}
                  </ul>
                  `
											: ''
									}
                  ${
										node.none.length > 0
											? `
                  <p><strong>다음을 제거해야 함:</strong></p>
                  <ul>
                    ${node.none.map((check) => `<li>${check.message}</li>`).join('')}
                  </ul>
                  `
											: ''
									}
                </div>
                `
										: ''
								}
              </div>
            `
							)
							.join('')}
          </div>
        </div>
      `
				)
				.join('')}
    </div>
    `
				: `
    <div class="section">
      <div class="empty-state">
        <div class="empty-state-icon">✅</div>
        <h3>위반 사항이 없습니다!</h3>
        <p>접근성 기준을 잘 준수하고 있습니다.</p>
      </div>
    </div>
    `
		}

    ${
			results.incomplete && results.incomplete.length > 0
				? `
    <div class="section">
      <h2>⚠️ 수동 검토 필요 (${results.incomplete.length}개)</h2>
      ${results.incomplete
				.map(
					(item, i) => `
        <div class="card" style="margin-bottom: 15px;">
          <h4>[${i + 1}] ${item.help}</h4>
          <p style="margin: 10px 0; color: #4a5568;">${item.description}</p>
          <div style="font-size: 14px; color: #718096;">
            영향받는 요소: ${item.nodes.length}개
          </div>
          <a href="${item.helpUrl}" target="_blank" class="link">자세히 보기 →</a>
        </div>
      `
				)
				.join('')}
    </div>
    `
				: ''
		}

    ${
			results.passes && results.passes.length > 0
				? `
    <div class="section">
      <h2>✅ 통과 항목 (${results.passes.length}개 규칙)</h2>
      <div class="card">
        <p style="color: #38a169; font-weight: 600;">
          ${results.passes.length}개의 접근성 규칙을 성공적으로 준수하고 있습니다.
        </p>
      </div>
    </div>
    `
				: ''
		}
  </div>
</body>
</html>`;

	// Blob으로 다운로드
	const blob = new Blob([html], { type: 'text/html' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);

	console.log(`\n📄 HTML 리포트가 다운로드되었습니다: ${filename}\n`);
}

/**
 * 페이지 로드 후 자동으로 검증 실행
 */
export function autoRunA11yCheck(delay = 2000) {
	if (!import.meta.env.DEV) return;

	setTimeout(() => {
		runA11yCheck({
			detailed: false,
			generateHtmlReport: true,
		});
	}, delay);
}
