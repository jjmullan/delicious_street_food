import type { Database } from '@/shared/types/supabase.type';

type Keyword = Database['public']['Tables']['keyword']['Row'];
type Location = Database['public']['Tables']['location']['Row'];
type User = Database['public']['Tables']['user']['Row'];
type item = Database['public']['Tables']['item']['Row'];

/**
 * 회원가입 시 본인이 거주하는 지역을 선택하는 Select 창
 */
export interface SelectCountryProps {
	location: Location;
	value?: string;
	onValueChange?: (value: string) => void;
}

/**
 * useMutation 에서 사용하는 상황별 로직
 */
export type MutationCallback = {
	onSuccess?(): void;
	onMutate?(): void;
	onError?(error: Error): void;
	onSettled?(): void;
};
