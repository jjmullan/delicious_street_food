import supabase from '@/shared/api/supabase/supabase';

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
