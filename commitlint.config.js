export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// type은 영어로만, 다음 타입만 허용
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
			],
		],
		// type은 소문자만 허용
		'type-case': [2, 'always', 'lower-case'],
		// type은 필수
		'type-empty': [2, 'never'],
		// subject(제목)는 필수
		'subject-empty': [2, 'never'],
		// subject는 대소문자 규칙 적용 안 함 (한글 허용)
		'subject-case': [0],
		// subject는 마침표로 끝나지 않음
		'subject-full-stop': [2, 'never', '.'],
		// header(전체 제목 줄)는 최대 100자
		'header-max-length': [2, 'always', 100],
		// body는 72자마다 줄바꿈 (한글 고려하여 넉넉하게)
		'body-max-line-length': [1, 'always', 100],
		// footer는 최대 100자
		'footer-max-line-length': [1, 'always', 100],
	},
};
