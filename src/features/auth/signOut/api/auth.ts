import supabase from '@/shared/api/supabase/supabase';

/**
 * 로그인 이용자 로그아웃 데이터 전송
 */
export async function signOut() {
	const { error } = await supabase.auth.signOut();

	// 에러가 발생하면, 로컬 스토리지에 보관된 엑세스 토큰을 삭제
	if (error) {
		await supabase.auth.signOut({
			scope: 'local',
		});
	}
}
