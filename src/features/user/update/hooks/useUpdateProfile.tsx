import { QUERY_KEYS } from '@shared/lib/query';
import type { MutationCallback } from '@shared/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@/features/user/update/api/user';

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
