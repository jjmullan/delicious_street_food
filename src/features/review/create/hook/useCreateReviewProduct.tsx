import { useMutation } from '@tanstack/react-query';
import { createReviewProduct } from '@/features/review/create/api/review';
import type { MutationCallback } from '@/shared/types/types';

function useCreateReviewProducts(callbacks: MutationCallback) {
	return useMutation({
		mutationFn: createReviewProduct,
		onSuccess: () => {
			if (callbacks.onSuccess) callbacks.onSuccess();
		},
		onError: (error) => {
			if (callbacks.onError) callbacks.onError(error);
		},
	});
}

export default useCreateReviewProducts;
