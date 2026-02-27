// 공통 JWT 인증 검증 헬퍼
import type { VercelRequest, VercelResponse } from '@vercel/node';
import supabaseServer from './supabase';

/**
 * Authorization 헤더의 Bearer 토큰을 검증하고 사용자 정보를 반환합니다.
 * 검증 실패 시 res에 401 응답을 직접 작성하고 null을 반환합니다.
 */
export async function verifyAuth(req: VercelRequest, res: VercelResponse) {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		res.status(401).json({ error: '인증 토큰이 없습니다.' });
		return null;
	}

	const {
		data: { user },
		error,
	} = await supabaseServer.auth.getUser(token);

	if (error || !user) {
		res.status(401).json({ error: '유효하지 않은 토큰입니다.' });
		return null;
	}

	return user;
}
