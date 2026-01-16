import { uploadProfileImage } from '@features/profile/api/image';
import { QUERY_KEYS } from '@shared/lib/query';
import type { MutationCallback } from '@shared/types/mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useUpdateProfileImage(callbacks: MutationCallback) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: uploadProfileImage,
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
