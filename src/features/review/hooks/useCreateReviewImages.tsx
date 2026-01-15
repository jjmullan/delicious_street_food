import { createReviewImages } from '@features/review/api/review';
import { QUERY_KEYS } from '@shared/lib/query';
import type { MutationCallback } from '@shared/types/mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useCreateReviewImages(callbacks: MutationCallback) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createReviewImages,
		onSuccess: (_data, variables) => {
			if (callbacks.onSuccess) callbacks.onSuccess();

			// 특정 review의 이미지 캐시 무효화
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.review.images.byReviewId(variables.review_id),
			});
		},
		onError: (error) => {
			if (callbacks.onError) callbacks.onError(error);
		},
	});
}

export default useCreateReviewImages;
