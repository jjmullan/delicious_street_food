import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAuth } from '../_lib/auth';
import supabaseServer from '../_lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method Not Allowed' });
	}

	const user = await verifyAuth(req, res);
	if (!user) return;

	const { review_id, product_id, is_recommend, order_price, order_quantity } = req.body;

	const { data, error } = await supabaseServer
		.from('review_product')
		.insert({ review_id, product_id, is_recommend, order_price, order_quantity })
		.select()
		.single();

	if (error) return res.status(500).json({ error: error.message });
	return res.status(201).json(data);
}
