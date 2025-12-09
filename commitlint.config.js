export default {
	// 표준 규칙을 상속
	// @example <type>: <subject>
	extends: ['@commitlint/config-conventional'],
	// 커스텀 파서: [branch-name] type: subject 형식 허용
	parserPreset: {
		parserOpts: {
			// 정규식: [선택적 브랜치명] type(선택적 scope): subject
			headerPattern: /^(?:\[([^\]]+)\] )?(\w+)(?:\(([^)]+)\))?: (.+)$/,
			headerCorrespondence: ['scope', 'type', 'scope', 'subject'],
		},
	},
	// 규칙 정의
	// 0: 무시, 1: 경고, 2: 에러
	// always: 항상, never: 절대 불가
	rules: {
		// 허용되는 커밋 타입 목록
		'type-enum': [
			2,
			'always',
			[
				'feat', // 새로운 기능 추가
				'fix', // 버그 수정
				'docs', // 문서 수정
				'style', // 코드 포맷팅, 세미콜론 누락 등 (기능 변경 없음)
				'refactor', // 코드 리팩토링 (기능 변경 없음)
				'perf', // 성능 개선
				'test', // 테스트 추가/수정
				'chore', // 빌드 프로세스, 패키지 매니저, 설정 파일 수정
				'revert', // 커밋 되돌리기
				'ci', // CI 설정 파일 수정
				'build', // 빌드 시스템 수정
				'init', // 초기 세팅
				'hotfix', // 긴급한 수정 (main 브랜치에서 분기)
				'src', // 정적 파일 추가
				'rename', // 파일명 수정
				'remove', // 파일 삭제
				'a11y', // 접근성
				'comment', // 주석
				'type', // 타입 수정
			],
		],
		// type : 필수, 영문 소문자만 허용
		'type-empty': [2, 'never'],
		'type-case': [2, 'always', 'lower-case'],

		// subject(제목) : 필수, 대소문자 규칙 적용 안함(한글 허용), 마침표로 끝나지 않음
		'subject-empty': [2, 'never'],
		'subject-case': [0],
		'subject-full-stop': [2, 'never', '.'],

		// scope(브랜치명)는 선택사항
		'scope-empty': [0],
		'scope-case': [0],

		// header(전체 제목 줄) : 최대 50자
		'header-max-length': [2, 'always', 50],

		// body : 경고, 80자마다 줄바꿈
		'body-max-line-length': [1, 'always', 80],
		'body-leading-blank': [0, 'always'],

		// footer : 경고, 최대 100자
		'footer-max-line-length': [1, 'always', 100],
	},
};
