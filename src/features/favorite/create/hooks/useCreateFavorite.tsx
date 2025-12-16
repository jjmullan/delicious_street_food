import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFavorite } from '@/features/favorite/create/api/favorite';
import type { MutationCallback } from '@/shared/types/types';

function useCreateFavorite(callbacks: MutationCallback) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createFavorite,
		onMutate: async () => {},
		onSuccess: () => {
			if (callbacks.onSuccess) callbacks.onSuccess();
		},
		onError: (error) => {
			if (callbacks.onError) callbacks.onError(error);
		},
	});
}

export default useCreateFavorite;
