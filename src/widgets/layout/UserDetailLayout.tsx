import { useSession } from '@shared/model/session';
import DetailHeader from '@widgets/header/DetailHeader';
import { Navigate, Outlet } from 'react-router';

/**
 * 최초 서비스 접근 시, 로그인 페이지로 라우팅
 */
function UserDetailLayout() {
	// 세션 데이터가 없으면 강제 라우팅
	const session = useSession();
	if (!session) return <Navigate to={'/login'} replace={true} />;

	return (
		<div className="min-h-svh full-width">
			<DetailHeader title={'마이페이지'} />
			<main className="mt-12">
				<Outlet context={{ session }} />
			</main>
		</div>
	);
}

export default UserDetailLayout;
