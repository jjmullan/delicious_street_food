import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview } from '@/features/review/delete/api/review';
import { QUERY_KEYS } from '@/shared/lib/query';
import type { MutationCallback, Review } from '@/shared/types/types';

export function useDeleteReview(callbacks: MutationCallback) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteReview,
		onSuccess: () => {
			if (callbacks.onSuccess) callbacks.onSuccess();
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.review.all });
		},
		onError: (error) => {
			if (callbacks.onError) callbacks.onError(error);
		},
	});
}
