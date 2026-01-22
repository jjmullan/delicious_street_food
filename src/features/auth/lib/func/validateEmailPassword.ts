import type { Validate } from '@features/auth';
import { regEmail, regPassword } from '@features/auth/lib/constants/validate';

/**
 * 이메일의 입력 오류 및 정규표현식을 검증하는 함수
 * @param email - 검증할 이메일 문자열
 * @returns 검증 결과 객체 (errors, data, isValid 포함)
 * @example
 * const result = validateEmail('user@example.com');
 * if (!result.isValid) {
 *   console.error(result.errors.email);
 * }
 */
export function validateEmail(email: string): Validate {
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

/**
 * 비밀번호의 입력 오류 및 정규표현식을 검증하는 함수
 * - 최소 8자 이상
 * - 대문자, 소문자, 숫자, 특수문자 각 1개 이상 포함
 * - 비밀번호와 비밀번호 확인 일치 여부
 * @param password - 검증할 비밀번호 문자열
 * @param passwordConfirm - 비밀번호 확인 문자열
 * @returns 검증 결과 객체 (errors, data, isValid 포함)
 * @example
 * const result = validatePassword('Password1!', 'Password1!');
 * if (!result.isValid) {
 *   console.error(result.errors.password || result.errors.passwordConfirm);
 * }
 */
export function validatePassword(password: string, passwordConfirm: string): Validate {
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
