import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview } from '@/features/review/delete/api/review';
import { QUERY_KEYS } from '@/shared/lib/query';
import type { MutationCallback, Review } from '@/shared/types/types';

export function useDeleteReview(callbacks: MutationCallback) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteReview,
		onSuccess: (data: Review) => {
			if (callbacks.onSuccess) callbacks.onSuccess();

			// 특정 location의 review 캐시만 무효화
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.review.byLocationId(data.location_id),
			});

			// 해당 review의 상세 캐시도 무효화
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.review.images.byReviewId(data.review_id),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.review.products.byReviewId(data.review_id),
			});
		},
		onError: (error) => {
			if (callbacks.onError) callbacks.onError(error);
		},
	});
}
