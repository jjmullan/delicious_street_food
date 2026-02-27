import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAuth } from '../_lib/auth';
import { getRandomUserNickname } from '../_lib/nickname';
import supabaseServer from '../_lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const user = await verifyAuth(req, res);
	if (!user) return;

	// POST: 신규 사용자 프로필 생성
	if (req.method === 'POST') {
		const { user_id } = req.body;

		const { data, error } = await supabaseServer
			.from('user')
			.insert({ user_id, nickname: getRandomUserNickname() })
			.select()
			.single();

		if (error) return res.status(500).json({ error: error.message });
		return res.status(201).json(data);
	}

	// PATCH: 프로필 정보(닉네임, 소개) 업데이트
	if (req.method === 'PATCH') {
		const { user_id, nickname, bio } = req.body;

		const { data, error } = await supabaseServer
			.from('user')
			.update({ nickname, bio })
			.eq('user_id', user_id)
			.select()
			.single();

		if (error) return res.status(500).json({ error: error.message });
		return res.status(200).json(data);
	}

	return res.status(405).json({ error: 'Method Not Allowed' });
}
