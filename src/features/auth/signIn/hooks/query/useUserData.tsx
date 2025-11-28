import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/features/auth/signIn/api/user';
import { QUERY_KEYS } from '@/shared/lib/query';

function useUserData(userId: string) {
	return useQuery({
		queryKey: QUERY_KEYS.user.byId(userId),
		queryFn: async () => {
			try {
				const user = await fetchUser(userId);
				return user;
			} catch (error) {
				console.error('유저 정보 패칭 오류:', error);
				if (error instanceof Error) throw error;
			}
		},
		enabled: !!userId,
	});
}

export default useUserData;
