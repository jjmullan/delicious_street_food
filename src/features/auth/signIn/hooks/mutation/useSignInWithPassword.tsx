import { useMutation } from '@tanstack/react-query';
import { SignInWithPassword } from '@/features/auth/signIn/api/auth';
import type { MutationCallback } from '@/shared/types/types';

/**
 * 이메일, 비밀번호를 이용한 로그인 요청 기능
 * @param callbacks Mutation 데이터 전송 흐름에 맞는 상태 처리
 * @returns
 */
function useSignInWithPassword(callbacks: MutationCallback) {
	return useMutation({
		mutationFn: SignInWithPassword,
		onMutate: () => {
			if (callbacks?.onMutate) callbacks.onMutate();
		},
		onSuccess: () => {
			if (callbacks.onSuccess) callbacks.onSuccess();
		},
		onError: (error) => {
			if (callbacks.onError) callbacks.onError(error);
		},
	});
}

export default useSignInWithPassword;
