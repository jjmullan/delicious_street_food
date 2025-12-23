import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import type { Product } from '@/shared/types/types';

type State = {
	product: Product | null;
};

const initialState = {
	product: null,
};

/**
 * Zustand 를 이용하여 Local Storage 에서 로그인 정보를 가져오기
 */
export const useProductFilterStore = create(
	devtools(
		combine(initialState as State, (set) => ({
			actions: {
				setProductFilter: (product: Product) => {
					set({ product });
				},
				resetProductFilter: () => {
					set({ product: null });
				},
			},
		})),
		{
			name: 'ProductFilterStore',
		}
	)
);

export function useSetProductFilter() {
	const setProductFilter = useProductFilterStore((state) => state.actions.setProductFilter);
	return setProductFilter;
}

export function useResetProductFilter() {
	const resetProductFilter = useProductFilterStore((state) => state.actions.resetProductFilter);
	return resetProductFilter;
}

export function useProductFilter() {
	const productFilter = useProductFilterStore((state) => state.product);
	return productFilter;
}
