import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAuth } from '../_lib/auth';
import supabaseServer from '../_lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'DELETE') {
		return res.status(405).json({ error: 'Method Not Allowed' });
	}

	const user = await verifyAuth(req, res);
	if (!user) return;

	const { id: favorite_id } = req.query;

	if (!favorite_id || typeof favorite_id !== 'string') {
		return res.status(400).json({ error: 'favorite_id가 필요합니다.' });
	}

	const { data, error } = await supabaseServer
		.from('favorite')
		.delete()
		.eq('favorite_id', favorite_id)
		.select()
		.maybeSingle();

	if (error) return res.status(500).json({ error: error.message });
	return res.status(200).json(data);
}
