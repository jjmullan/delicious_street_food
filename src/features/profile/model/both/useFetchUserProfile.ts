import { fetchUserProfile } from '@entities/user';
import { createUserProfile } from '@features/profile';
import { QUERY_KEYS } from '@shared/lib/query';
import { useSession } from '@shared/model/session';
import type { User } from '@shared/types/api';
import type { PostgrestError } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

export default function useFetchUserData(userId?: string) {
	const session = useSession();
	const isMine = userId === session?.user.id;

	return useQuery<User>({
		queryKey: QUERY_KEYS.user.byId(userId!),
		queryFn: async () => {
			try {
				const user = await fetchUserProfile(userId!);
				return user;
			} catch (error) {
				if (isMine && (error as PostgrestError).code === 'PGRST116') {
					return await createUserProfile(userId!);
				}

				throw error;
			}
		},
		enabled: !!userId,
	});
}
