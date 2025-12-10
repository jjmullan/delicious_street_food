import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview } from '@/features/review/create/api/review';
import { QUERY_KEYS } from '@/shared/lib/query';
import type { MutationCallback } from '@/shared/types/types';

function useCreateReviewImages(callbacks: MutationCallback) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createReview,
		onSuccess: () => {
			if (callbacks.onSuccess) callbacks.onSuccess();

			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.review.all,
			});
		},
		onError: (error) => {
			if (callbacks.onError) callbacks.onError(error);
		},
	});
}

export default useCreateReviewImages;
