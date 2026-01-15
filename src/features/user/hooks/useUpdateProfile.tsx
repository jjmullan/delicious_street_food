import { updateProfile } from '@features/user/api/user';
import { QUERY_KEYS } from '@shared/lib/query';
import type { MutationCallback } from '@shared/types/mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useUpdateProfile(callbacks: MutationCallback) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProfile,
		onSuccess: () => {
			if (callbacks.onSuccess) callbacks.onSuccess();

			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.user.all,
			});
		},
		onError: (error) => {
			if (callbacks.onError) callbacks.onError(error);
		},
	});
}

export default useUpdateProfile;
