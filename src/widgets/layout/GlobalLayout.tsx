import { Outlet } from 'react-router';

/**
 * 공통 레이아웃
 * - Outlet: React Router의 자식 라우트를 렌더링하는 위치
 */
function GlobalLayout() {
	return (
		<div className="min-w-[320px] w-full max-w-[768px] min-h-svh relative md:border-x mx-auto flex flex-col justify-center">
			{/* 메인 콘텐츠 영역 */}
			<Outlet />
		</div>
	);
}

export default GlobalLayout;
