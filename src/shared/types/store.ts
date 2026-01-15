import type { Session } from '@supabase/supabase-js';

// 전역 상태 ConfirmModal 타입
export type OpenState = {
	isOpen: true;
	title: string;
	description: string;
	onPositive?(): void;
	onNegative?(): void;
};

export type CloseState = {
	isOpen: false;
};

export type ConfirmModalState = CloseState | OpenState;

// 전역 상태 Session 타입
export type SessionState = {
	session: Session | null;
	isLoaded: boolean;
};

export type SessionAction = {
	setSession(session: Session | null): void;
};
