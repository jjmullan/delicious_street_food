import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface GlobalState {
	// 예제: 사용자 정보
	user: {
		id: string;
		name: string;
	} | null;

	// 예제: 테마 설정
	theme: 'light' | 'dark';

	// 액션: 사용자 설정
	setUser: (user: GlobalState['user']) => void;

	// 액션: 테마 변경
	setTheme: (theme: GlobalState['theme']) => void;

	// 액션: 상태 초기화
	reset: () => void;
}

/**
 * 초기 상태 정의
 */
const initialState = {
	user: null,
	theme: 'light' as const,
};

/**
 * Zustand 스토어 생성
 * - devtools: Redux DevTools 연동 (개발 환경에서만)
 * - persist: LocalStorage에 상태 영속화 (선택적)
 */
export const useGlobalStore = create<GlobalState>()(
	devtools(
		persist(
			(set) => ({
				...initialState,

				setUser: (user) => set({ user }, false, 'setUser'),

				setTheme: (theme) => set({ theme }, false, 'setTheme'),

				reset: () => set(initialState, false, 'reset'),
			}),
			{
				name: 'global-storage', // LocalStorage key
				// 필요한 경우 특정 상태만 persist
				// partialize: (state) => ({ theme: state.theme }),
			}
		),
		{
			name: 'GlobalStore', // DevTools에서 표시될 이름
			enabled: import.meta.env.DEV, // 개발 환경에서만 활성화
		}
	)
);
