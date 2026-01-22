import { createFavorite, deleteFavorite } from '@features/favorite';
import { QUERY_KEYS } from '@shared/lib/query';
import type { Favorite } from '@shared/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ToggleFavoriteParams {
	action: 'add' | 'remove';
	favoriteId?: string;
}

/**
 * 즐겨찾기 토글 훅
 * UI에서 현재 상태를 판단하여 추가/삭제 액션을 전달받음
 */
function useToggleFavorite(locationId: string, userId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ action, favoriteId }: ToggleFavoriteParams) => {
			if (action === 'remove' && favoriteId) {
				// 즐겨찾기 삭제
				return deleteFavorite(favoriteId);
			} else {
				// 즐겨찾기 추가
				return createFavorite({ location_id: locationId, user_id: userId });
			}
		},
		onMutate: async ({ action }: ToggleFavoriteParams) => {
			// 진행 중인 쿼리 취소
			await queryClient.cancelQueries({
				queryKey: QUERY_KEYS.favorite.byLocationId(locationId),
			});

			// 이전 캐시 데이터 백업
			const previousFavorites = queryClient.getQueryData<Favorite[]>(QUERY_KEYS.favorite.byLocationId(locationId));

			// 낙관적 업데이트
			queryClient.setQueryData<Favorite[]>(QUERY_KEYS.favorite.byLocationId(locationId), (old = []) => {
				if (action === 'remove') {
					// 즐겨찾기 삭제 (낙관적)
					return old.filter((favorite) => favorite.user_id !== userId);
				} else {
					// 즐겨찾기 추가 (낙관적)
					const newFavorite: Favorite = {
						favorite_id: crypto.randomUUID(), // 임시 UUID 생성
						location_id: locationId,
						user_id: userId,
						created_at: new Date().toISOString(),
					};
					return [...old, newFavorite];
				}
			});

			// 롤백을 위한 이전 데이터 반환
			return { previousFavorites };
		},
		onError: (error, _, context) => {
			// 에러 발생 시 이전 데이터로 롤백
			if (context?.previousFavorites) {
				queryClient.setQueryData(QUERY_KEYS.favorite.byLocationId(locationId), context.previousFavorites);
			}
			console.error('즐겨찾기 토글 오류:', error);
		},
		onSettled: () => {
			// 뮤테이션 완료 후 쿼리 무효화하여 최신 데이터 가져오기
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.favorite.byLocationId(locationId),
			});
		},
	});
}

export default useToggleFavorite;
