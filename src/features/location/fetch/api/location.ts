import supabase from '@/shared/api/supabase/supabase';
import type { Location } from '@/shared/types/types';

export async function fetchLocation() {
	const request = supabase.from('location').select('*');
	const { data, error } = await request;

	if (error) throw error;
	return data.map((location: Location) => ({
		...location,
	}));
}
