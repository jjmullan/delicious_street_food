import type { Database } from '@shared/types/supabase.type';

// [Supabase] 1차 정제 : 테이블 컬럼 타입만 추출
export type Favorite = Database['public']['Tables']['favorite']['Row'];
export type Location = Database['public']['Tables']['location']['Row'];
export type Product = Database['public']['Tables']['product']['Row'];
export type Review = Database['public']['Tables']['review']['Row'];
export type ReviewProduct = Database['public']['Tables']['review_product']['Row'];
export type ReviewImage = Database['public']['Tables']['review_image']['Row'];
export type Reward = Database['public']['Tables']['reward']['Row'];
export type RewardList = Database['public']['Tables']['reward_list']['Row'];
export type User = Database['public']['Tables']['user']['Row'];

// [Supabase] 2차 정제 : 데이터 전송에 필요한 요소만
export type API_Location = Pick<Location, 'user_id' | 'latitude' | 'longitude' | 'location_name' | 'location_address'>;
export type API_Review = Pick<
	Review,
	'user_id' | 'location_id' | 'review_title' | 'review_text' | 'is_recommended' | 'visit_datetime'
>;
export type API_ReviewImage = Pick<ReviewImage, 'review_id' | 'review_image_url'>;
export type API_ReviewProduct = Pick<
	ReviewProduct,
	'review_id' | 'product_id' | 'is_recommend' | 'order_price' | 'order_quantity'
>;
export type API_Favorite = Pick<Favorite, 'location_id' | 'user_id'>;

// [Tanstack Query] Mutation 콜백 함수 정의
export type MutationCallback = {
	onSuccess?(): void;
	onMutate?(): void;
	onError?(error: Error): void;
	onSettled?(): void;
};
