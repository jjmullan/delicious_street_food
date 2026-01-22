import { AUTH_ERROR_MESSAGE_MAP } from '@features/auth/lib/constants/error';
import { AuthError } from '@supabase/supabase-js';

export function generateErrorMessage(error: unknown) {
	if (error instanceof AuthError && error.code) {
		return AUTH_ERROR_MESSAGE_MAP[error.code] ?? '알 수 없는 인증 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
	}

	return '문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
}
