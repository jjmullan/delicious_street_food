import { useSession } from '@shared/model/session';
import CreateReviewHeader from '@widgets/header/CreateReviewHeader';
import { Navigate, Outlet } from 'react-router';

/**
 * 최초 서비스 접근 시, 로그인 페이지로 라우팅
 */
function CreateReviewLayout() {
	const session = useSession();
	if (!session) return <Navigate to={'/login'} replace={true} />;

	return (
		<div className="min-h-svh full-width">
			<CreateReviewHeader />
			<main className="mt-12 mb-20">
				<Outlet context={{ session }} />
			</main>
		</div>
	);
}

export default CreateReviewLayout;
