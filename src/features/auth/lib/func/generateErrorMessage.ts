import { AUTH_ERROR_MESSAGE_MAP } from '@features/auth/lib/constants/error';
import { AuthError } from '@supabase/supabase-js';

/**
 * 인증 에러를 사용자 친화적인 메시지로 변환하는 함수
 * @param error - 발생한 에러 객체
 * @returns 사용자에게 표시할 에러 메시지 문자열
 * @example
 * try {
 *   await signIn(email, password);
 * } catch (error) {
 *   const message = generateErrorMessage(error);
 *   alert(message);
 * }
 */
export function generateErrorMessage(error: unknown) {
	if (error instanceof AuthError && error.code) {
		return AUTH_ERROR_MESSAGE_MAP[error.code] ?? '알 수 없는 인증 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
	}

	return '문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
}
