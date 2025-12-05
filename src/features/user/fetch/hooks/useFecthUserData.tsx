import type { PostgrestError } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/app/store/sessionStore';
import { createUser } from '@/features/user/create/api/user';
import { fetchProfile } from '@/features/user/fetch/api/user';
import { QUERY_KEYS } from '@/shared/lib/query';
import type { User } from '@/shared/types/types';

function useFecthUserData(userId?: string) {
	const session = useSession();
	const isMine = userId === session?.user.id;

	return useQuery<User>({
		queryKey: QUERY_KEYS.user.byId(userId!),
		queryFn: async () => {
			try {
				const user = await fetchProfile(userId!);
				return user;
			} catch (error) {
				if (isMine && (error as PostgrestError).code === 'PGRST116') {
					return await createUser(userId!);
				}

				throw error;
			}
		},
		enabled: !!userId,
	});
}

export default useFecthUserData;
