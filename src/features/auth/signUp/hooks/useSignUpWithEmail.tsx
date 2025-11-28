import { useMutation } from '@tanstack/react-query';
import { SignUpWithEmail } from '@/features/auth/signUp/api/auth';
import type { MutationCallback } from '@/shared/types/types';

function useSignUpWithEmail(callbacks: MutationCallback) {
	return useMutation({
		mutationFn: SignUpWithEmail,
		onSuccess: () => {
			if (callbacks.onSuccess) callbacks.onSuccess();
		},
		onError: (error) => {
			if (callbacks.onError) callbacks.onError(error);
		},
	});
}

export default useSignUpWithEmail;
