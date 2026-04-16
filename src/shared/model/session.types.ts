import type { Session } from '@supabase/supabase-js';

// 전역 상태 Session 타입
export type SessionState = {
	session: Session | null;
	isLoaded: boolean;
};

export type SessionAction = {
	setSession(session: Session | null): void;
};
