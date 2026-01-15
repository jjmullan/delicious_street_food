import { deleteReview } from '@features/review/api/review';
import { QUERY_KEYS } from '@shared/lib/query';
import type { MutationCallback, Review } from '@shared/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteReview(callbacks: MutationCallback) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteReview,
		onSuccess: (data: Review) => {
			if (callbacks.onSuccess) callbacks.onSuccess();

			// 전체 review 캐시 무효화
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.review.all,
			});

			// 특정 location의 review 관련 캐시 무효화
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.review.byLocationId(data.location_id),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.review.images.byLocationId(data.location_id),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.review.products.byLocationId(data.location_id),
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
