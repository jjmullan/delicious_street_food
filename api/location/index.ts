import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAuth } from '../_lib/auth';
import supabaseServer from '../_lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method Not Allowed' });
	}

	const user = await verifyAuth(req, res);
	if (!user) return;

	const { user_id, latitude, longitude, location_name, location_address } = req.body;

	const { data, error } = await supabaseServer
		.from('location')
		.insert({ user_id, latitude, longitude, location_name, location_address })
		.select()
		.single();

	if (error) return res.status(500).json({ error: error.message });
	return res.status(201).json(data);
}
