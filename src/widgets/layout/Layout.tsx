// 애플리케이션 전역 레이아웃 컴포넌트
// 모든 페이지에서 공통으로 사용되는 레이아웃 구조를 정의합니다.

import { Outlet } from 'react-router-dom';
import './Layout.css';

/**
 * Layout 컴포넌트
 * - Outlet: React Router의 자식 라우트를 렌더링하는 위치
 * - 헤더, 네비게이션, 푸터 등 공통 UI 요소를 여기에 추가할 수 있습니다.
 */
function Layout() {
	return (
		<div>
			{/* 헤더 영역 - 필요시 widgets/header 컴포넌트를 import하여 사용 */}
			<header>
				<nav>{/* 네비게이션 메뉴는 widgets/navigation 컴포넌트로 분리 가능 */}</nav>
			</header>

			{/* 메인 콘텐츠 영역 - 자식 라우트가 렌더링되는 위치 */}
			<main>
				<Outlet />
			</main>

			{/* 푸터 영역 - 필요시 widgets/footer 컴포넌트를 import하여 사용 */}
			<footer></footer>
		</div>
	);
}

export default Layout;
