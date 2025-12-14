import supabase from '@/shared/api/supabase/supabase';

export async function deleteReview(review_id: string) {
	const { data, error } = await supabase.from('review').delete().eq('review_id', review_id).select().single();

	if (error) throw error;
	return data;
}
