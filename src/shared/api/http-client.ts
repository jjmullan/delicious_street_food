// ky HTTP 클라이언트 설정
// REST API 요청을 위한 공통 HTTP 클라이언트입니다.

import ky from 'ky';

/**
 * 기본 HTTP 클라이언트
 * - 타임아웃, 재시도, 인터셉터 등 공통 설정
 */
export const httpClient = ky.create({
	// API 기본 URL (환경변수에서 가져오기)
	prefixUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',

	// 타임아웃 설정 (10초)
	timeout: 10000,

	// 재시도 설정
	retry: {
		limit: 2,
		methods: ['get', 'put', 'head', 'delete', 'options', 'trace'],
		statusCodes: [408, 413, 429, 500, 502, 503, 504],
	},

	// 요청 전 훅 (예: 인증 토큰 추가)
	hooks: {
		beforeRequest: [
			(request) => {
				// LocalStorage에서 토큰 가져오기
				const token = localStorage.getItem('auth_token');
				if (token) {
					request.headers.set('Authorization', `Bearer ${token}`);
				}
			},
		],
		afterResponse: [
			async (_request, _options, response) => {
				// 401 Unauthorized 처리
				if (response.status === 401) {
					// 토큰 만료 시 로그아웃 처리
					localStorage.removeItem('auth_token');
					// 필요한 경우 로그인 페이지로 리다이렉트
					// window.location.href = '/login';
				}
				return response;
			},
		],
	},
});

/**
 * API 응답 타입 헬퍼
 */
export type ApiResponse<T> = {
	data: T;
	message?: string;
	error?: string;
};

/**
 * GET 요청 헬퍼
 */
export async function get<T>(url: string, searchParams?: Record<string, string | number>) {
	return httpClient.get(url, { searchParams }).json<ApiResponse<T>>();
}

/**
 * POST 요청 헬퍼
 */
export async function post<T, D = unknown>(url: string, data: D) {
	return httpClient.post(url, { json: data }).json<ApiResponse<T>>();
}

/**
 * PUT 요청 헬퍼
 */
export async function put<T, D = unknown>(url: string, data: D) {
	return httpClient.put(url, { json: data }).json<ApiResponse<T>>();
}

/**
 * DELETE 요청 헬퍼
 */
export async function del<T>(url: string) {
	return httpClient.delete(url).json<ApiResponse<T>>();
}
