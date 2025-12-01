import supabase from '@/shared/api/supabase/supabase';
import { getRandomUserNickname } from '@/shared/lib/utils';

export async function createUser(userId: string) {
	const { data, error } = await supabase
		.from('user')
		.insert({ user_id: userId, user_nickname: getRandomUserNickname() })
		.select()
		.single();

	if (error) throw error;
	return data;
}
