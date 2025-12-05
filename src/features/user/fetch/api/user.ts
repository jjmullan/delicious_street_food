import supabase from '@/shared/api/supabase/supabase';

export async function fetchProfile(userId: string) {
	const { data, error } = await supabase.from('user').select('*').eq('user_id', userId).single();

	if (error) throw error;
	return data;
}
