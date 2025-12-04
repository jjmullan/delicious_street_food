import type { Database } from '@/shared/types/supabase.type';

export type Favorite = Database['public']['Tables']['favorite']['Row'];
export type Location = Database['public']['Tables']['location']['Row'];
export type Product = Database['public']['Tables']['product']['Row'];
export type ProductList = Database['public']['Tables']['product_list']['Row'];
export type Review = Database['public']['Tables']['review']['Row'];
export type ReviewImage = Database['public']['Tables']['review_image']['Row'];
export type ReviewProduct = Database['public']['Tables']['review_product']['Row'];
export type Reward = Database['public']['Tables']['reward']['Row'];
export type RewardList = Database['public']['Tables']['reward_list']['Row'];
export type User = Database['public']['Tables']['user']['Row'];

/**
 * useMutation 에서 사용하는 상황별 로직
 */
export type MutationCallback = {
	onSuccess?(): void;
	onMutate?(): void;
	onError?(error: Error): void;
	onSettled?(): void;
};
