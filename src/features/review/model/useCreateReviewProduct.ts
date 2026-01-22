import { createReviewProduct } from '@features/review';
import { QUERY_KEYS } from '@shared/lib/query';
import type { MutationCallback } from '@shared/types/mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useCreateReviewProducts(callbacks: MutationCallback) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createReviewProduct,
		onSuccess: (_data, variables) => {
			if (callbacks.onSuccess) callbacks.onSuccess();

			// 특정 review의 product 캐시 무효화
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.review.products.byReviewId(variables.review_id),
			});
		},
		onError: (error) => {
			if (callbacks.onError) callbacks.onError(error);
		},
	});
}

export default useCreateReviewProducts;
