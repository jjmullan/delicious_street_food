// Storage 업로드는 클라이언트에서 직접 처리합니다.
// 이 엔드포인트는 업로드 완료 후 전달받은 public URL을 user 테이블에 저장하는 역할만 담당합니다.
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAuth } from '../_lib/auth';
import supabaseServer from '../_lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'PATCH') {
		return res.status(405).json({ error: 'Method Not Allowed' });
	}

	const user = await verifyAuth(req, res);
	if (!user) return;

	const { user_id, profile_image_url } = req.body;

	const { data, error } = await supabaseServer
		.from('user')
		.update({ profile_image_url })
		.eq('user_id', user_id)
		.select()
		.single();

	if (error) return res.status(500).json({ error: error.message });
	return res.status(200).json(data);
}
