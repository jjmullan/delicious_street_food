import { createReview } from '@features/review/api/review';
import { QUERY_KEYS } from '@shared/lib/query';
import type { MutationCallback } from '@shared/types/mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useCreateReview(callbacks: MutationCallback) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createReview,
		onSuccess: (data) => {
			if (callbacks.onSuccess) callbacks.onSuccess();

			// 특정 location의 review 관련 캐시 무효화
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.review.all,
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.review.byLocationId(data.location_id),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.review.images.byLocationId(data.location_id),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.review.products.byLocationId(data.location_id),
			});
		},
		onError: (error) => {
			if (callbacks.onError) callbacks.onError(error);
		},
	});
}

export default useCreateReview;
