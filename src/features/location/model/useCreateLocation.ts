import { createLocation } from '@features/location/api/location';
import { QUERY_KEYS } from '@shared/lib/query';
import type { MutationCallback } from '@shared/types/mutation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useCreateLocation(callbacks: MutationCallback) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createLocation,
		onSuccess: () => {
			if (callbacks.onSuccess) callbacks.onSuccess();

			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.location.all,
			});
		},
		onError: (error) => {
			if (callbacks.onError) callbacks.onError(error);
		},
	});
}

export default useCreateLocation;
