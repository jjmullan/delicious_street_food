import { regPassword } from '@/features/auth/signUp/lib/regExp';
import type { Validate } from '@/features/auth/signUp/types/types';

/**
 * 비밀번호의 입력 오류 및 정규표현식을 검증하는 기능 함수
 * @param password 비밀번호
 * @param passwordConfirm 비밀번호 확인
 * @returns
 */
export default function validatePassword(password: string, passwordConfirm: string): Validate {
	// 비밀번호 오류 검증
	if (!password || password.trim() === '') {
		return {
			errors: {
				password: '비밀번호를 입력해주세요.',
			},
			isValid: false,
		};
	}

	// 정규표현식 검증
	if (!regPassword.hasSymbol.test(password)) {
		return {
			errors: {
				password: '비밀번호는 최소 1개 이상의 특수문자가 포함되어야 합니다.',
			},
			isValid: false,
		};
	}
	if (!regPassword.hasUpperCase.test(password)) {
		return {
			errors: {
				password: '비밀번호는 최소 1개 이상의 대문자가 포함되어야 합니다.',
			},
			isValid: false,
		};
	}
	if (!regPassword.hasDigit.test(password)) {
		return {
			errors: {
				password: '비밀번호는 최소 1개 이상의 숫자가 포함되어야 합니다.',
			},
			isValid: false,
		};
	}
	if (!regPassword.hasLowerCase.test(password)) {
		return {
			errors: {
				password: '비밀번호는 최소 1개 이상의 소문자가 포함되어야 합니다.',
			},
			isValid: false,
		};
	}
	if (!regPassword.minLength.test(password)) {
		return {
			errors: {
				password: '비밀번호는 최소 8자 이상이어야 합니다.',
			},
			isValid: false,
		};
	}

	if (password !== passwordConfirm) {
		// 비밀번호와 비밀번호 확인 텍스트의 일치 여부 검증
		return {
			errors: {
				passwordConfirm: '비밀번호가 일치하지 않습니다.',
			},
			isValid: false,
		};
	}

	return {
		errors: {
			password: '',
			passwordConfirm: '',
		},
		data: {
			password,
			passwordConfirm,
		},
		isValid: true,
	};
}
