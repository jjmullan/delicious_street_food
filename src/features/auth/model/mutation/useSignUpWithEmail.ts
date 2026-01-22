import { SignUpWithEmail } from '@features/auth';
import type { MutationCallback } from '@shared/types/mutation';
import { useMutation } from '@tanstack/react-query';

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
