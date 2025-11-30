import Header from '@/widgets/header/PublicHeader';
import Main from '@/widgets/main/Main';

/**
 * GlobalLayout 컴포넌트
 * - Outlet: React Router의 자식 라우트를 렌더링하는 위치
 * - 헤더, 네비게이션, 푸터 등 공통 UI 요소를 여기에 추가할 수 있습니다.
 */
function GlobalLayout() {
	return (
		<div className="flex min-h-screen flex-col min-w-screen w-full relative">
			{/* 메인 콘텐츠 영역 */}
			<Main />
		</div>
	);
}

export default GlobalLayout;
