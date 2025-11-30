import Footer from '@/widgets/footer/Footer';
import Header from '@/widgets/header/Header';
import Main from '@/widgets/main/Main';
import KakaoMapLocation from '@/widgets/map/KakaoMapLocation';

/**
 * GlobalLayout 컴포넌트
 * - Outlet: React Router의 자식 라우트를 렌더링하는 위치
 * - 헤더, 네비게이션, 푸터 등 공통 UI 요소를 여기에 추가할 수 있습니다.
 */
function GlobalLayout() {
	return (
		<div className="flex min-h-screen flex-col min-w-screen w-full relative">
			{/* 카카오 맵 영역 */}
			<KakaoMapLocation />
			{/* 헤더 영역 - 필요시 widgets/header 컴포넌트를 import하여 사용 */}
			<Header />
			{/* 메인 콘텐츠 영역 - 자식 라우트가 렌더링되는 위치 */}
			<Main />
			{/* 푸터 영역 - 필요시 widgets/footer 컴포넌트를 import하여 사용 */}
			<Footer />
		</div>
	);
}

export default GlobalLayout;
