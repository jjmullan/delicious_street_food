import type { Database } from '@/shared/types/supabase.type';

type Keyword = Database['public']['Tables']['keyword']['Row'];
type Location = Database['public']['Tables']['location']['Row'];
type Member = Database['public']['Tables']['member']['Row'];
type MemberReward = Database['public']['Tables']['member_reward']['Row'];
type Product = Database['public']['Tables']['product']['Row'];
type ProductImage = Database['public']['Tables']['product_image']['Row'];
type ProductKeyword = Database['public']['Tables']['product_keyword']['Row'];
type Reward = Database['public']['Tables']['reward']['Row'];

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
