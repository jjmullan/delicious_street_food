import { QUERY_KEYS } from '@shared/lib/query';
import type { MutationCallback } from '@shared/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadProfileImage } from '@/features/user/update/api/image';

function useUpdateProfileImage(callbacks: MutationCallback) {
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

export default useUpdateProfileImage;
