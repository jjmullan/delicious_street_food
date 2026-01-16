/**
 * 닉네임에 금지어가 포함되어 있는지 검증
 * @param nickname - 검증할 닉네임
 * @returns 유효성 검증 결과 { isValid: boolean, errorMessage?: string }
 */
export function validateNickname(nickname: string): { isValid: boolean; errorMessage?: string } {
	// 금지어 목록
	const forbiddenWords = ['포장맛차', '공식', '오피셜', 'official', '관리자', 'admin', '관리'];

	// 닉네임이 비어있는 경우
	if (!nickname || nickname.trim() === '') {
		return {
			isValid: false,
			errorMessage: '닉네임을 입력해주세요',
		};
	}

	// 대소문자 구분 없이 금지어 체크
	const lowerNickname = nickname.toLowerCase();

	for (const word of forbiddenWords) {
		if (lowerNickname.includes(word.toLowerCase())) {
			return {
				isValid: false,
				errorMessage: `'${word}'은(는) 사용할 수 없는 단어입니다`,
			};
		}
	}

	// 모든 검증 통과
	return {
		isValid: true,
	};
}

export default validateNickname;
