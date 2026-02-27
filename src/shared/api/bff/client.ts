// BFF 엔드포인트 공통 fetch 헬퍼
// Authorization 헤더 주입 및 에러 처리를 일원화합니다.
import supabase from '@shared/api/supabase/supabase';

async function getAuthHeader(): Promise<Record<string, string>> {
	const {
		data: { session },
	} = await supabase.auth.getSession();
	const token = session?.access_token;
	return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, method: string, body?: unknown): Promise<T> {
	const authHeader = await getAuthHeader();
	const res = await fetch(path, {
		method,
		headers: { 'Content-Type': 'application/json', ...authHeader },
		body: body !== undefined ? JSON.stringify(body) : undefined,
	});

	if (!res.ok) {
		const err = await res.json().catch(() => ({}));
		throw new Error(err.error ?? '요청에 실패했습니다.');
	}

	return res.json() as Promise<T>;
}

export function bffPost<T>(path: string, body: unknown): Promise<T> {
	return request<T>(path, 'POST', body);
}

export function bffPatch<T>(path: string, body: unknown): Promise<T> {
	return request<T>(path, 'PATCH', body);
}

export function bffDelete<T>(path: string, body?: unknown): Promise<T> {
	return request<T>(path, 'DELETE', body);
}
