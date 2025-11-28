import { regEmail } from '@/features/auth/signUp/lib/regExp';
import type { Validate } from '@/features/auth/signUp/types/types';

/**
 * 이메일의 입력 오류 및 정규표현식을 검증하는 기능 함수
 * @param email 이메일
 * @returns
 */
export default function validateEmail(email: string): Validate {
	// 이메일 오류 검증
	if (!email || email.trim() === '') {
		return {
			errors: {
				email: '이메일을 입력해주세요.',
			},
			isValid: false,
		};
	}

	// 정규표현식 검증
	if (!regEmail.test(email)) {
		return {
			errors: {
				email: '올바른 이메일 형식이 아닙니다.',
			},
			isValid: false,
		};
	}

	return {
		errors: {
			email: '',
		},
		data: {
			email,
		},
		isValid: true,
	};
}
