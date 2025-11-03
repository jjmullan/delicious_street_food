// 라우팅 에러 처리 페이지 컴포넌트
// React Router의 errorElement로 사용되어 라우팅 중 발생하는 에러를 처리합니다.
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import './ErrorPage.css';

/**
 * ErrorPage 컴포넌트
 * - 404 Not Found, 500 Internal Server Error 등의 라우팅 에러를 처리
 * - useRouteError 훅을 사용하여 에러 정보를 가져옵니다.
 */
function ErrorPage() {
	const error = useRouteError();

	// React Router의 에러 응답인지 확인
	let errorMessage: string;
	let errorStatus: number | undefined;

	if (isRouteErrorResponse(error)) {
		// 404, 500 등의 HTTP 에러
		errorStatus = error.status;
		errorMessage = error.statusText || error.data?.message || '알 수 없는 오류가 발생했습니다.';
	} else if (error instanceof Error) {
		// JavaScript 에러
		errorMessage = error.message;
	} else {
		// 기타 에러
		errorMessage = '알 수 없는 오류가 발생했습니다.';
	}

	return (
		<div className="error-page">
			<div className="error-page__content">
				<h1 className="error-page__title">{errorStatus ? `${errorStatus}` : '오류'}</h1>
				<p className="error-page__message">
					{errorStatus === 404 ? '페이지를 찾을 수 없습니다.' : '문제가 발생했습니다.'}
				</p>
				<p className="error-page__detail">{errorMessage}</p>
				<div className="error-page__actions">
					<Link to="/" className="error-page__button">
						홈으로 돌아가기
					</Link>
					<button
						type="button"
						onClick={() => window.history.back()}
						className="error-page__button error-page__button--secondary"
					>
						이전 페이지로
					</button>
				</div>
			</div>
		</div>
	);
}

export default ErrorPage;
