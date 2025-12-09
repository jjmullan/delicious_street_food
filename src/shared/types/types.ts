import type { Database } from '@/shared/types/supabase.type';

export type Favorite = Database['public']['Tables']['favorite']['Row'];
export type Location = Database['public']['Tables']['location']['Row'];
export type Product = Database['public']['Tables']['product']['Row'];
export type Review = Database['public']['Tables']['review']['Row'];
export type ReviewProduct = Database['public']['Tables']['review_product']['Row'];
export type ReviewImage = Database['public']['Tables']['review_image']['Row'];
export type Reward = Database['public']['Tables']['reward']['Row'];
export type RewardList = Database['public']['Tables']['reward_list']['Row'];
export type User = Database['public']['Tables']['user']['Row'];

export type API_Location = Pick<Location, 'user_id' | 'latitude' | 'longitude'>;
export type API_Review = Pick<
	Review,
	'user_id' | 'location_id' | 'review_title' | 'review_text' | 'is_recommended' | 'visit_date' | 'visit_time'
>;
export type API_ReviewImage = Pick<ReviewImage, 'review_id' | 'review_image_url'>;
export type API_ReviewProduct = Pick<
	ReviewProduct,
	'review_id' | 'product_id' | 'is_recommend' | 'order_price' | 'order_quantity'
>;

/**
 * useMutation 에서 사용하는 상황별 로직
 */
export type MutationCallback = {
	onSuccess?(): void;
	onMutate?(): void;
	onError?(error: Error): void;
	onSettled?(): void;
};
