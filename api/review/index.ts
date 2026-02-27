import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAuth } from '../_lib/auth';
import supabaseServer from '../_lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const user = await verifyAuth(req, res);
	if (!user) return;

	// POST: 리뷰 작성
	if (req.method === 'POST') {
		const { user_id, location_id, review_title, review_text, is_recommended, visit_datetime } = req.body;

		const { data, error } = await supabaseServer
			.from('review')
			.insert({ user_id, location_id, review_title, review_text, is_recommended, visit_datetime })
			.select()
			.single();

		if (error) return res.status(500).json({ error: error.message });
		return res.status(201).json(data);
	}

	// DELETE: 리뷰 삭제
	if (req.method === 'DELETE') {
		const { review_id } = req.body;

		const { data, error } = await supabaseServer.from('review').delete().eq('review_id', review_id).select().single();

		if (error) return res.status(500).json({ error: error.message });
		return res.status(200).json(data);
	}

	return res.status(405).json({ error: 'Method Not Allowed' });
}
