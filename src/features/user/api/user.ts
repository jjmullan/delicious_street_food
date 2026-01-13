import supabase from '@shared/api/supabase/supabase';
import { getRandomUserNickname } from '@shared/lib/utils';

export async function createUser(userId: string) {
	const { data, error } = await supabase
		.from('user')
		.insert({ user_id: userId, nickname: getRandomUserNickname() })
		.select()
		.single();

	if (error) throw error;
	return data;
}

export async function fetchProfile(userId: string) {
	const { data, error } = await supabase.from('user').select('*').eq('user_id', userId).single();

	if (error) throw error;
	return data;
}

export async function updateProfile({ user_id, nickname, bio }: { user_id: string; nickname: string; bio?: string }) {
	const { data, error } = await supabase
		.from('user')
		.update({ nickname, bio })
		.eq('user_id', user_id)
		.select()
		.single();

	if (error) throw error;
	return data;
}
