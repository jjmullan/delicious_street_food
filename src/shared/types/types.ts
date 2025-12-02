import type { Database } from '@/shared/types/supabase.type';

type Location = Database['public']['Tables']['location']['Row'];
type Product = Database['public']['Tables']['product']['Row'];
type ProductList = Database['public']['Tables']['product_list']['Row'];
type Review = Database['public']['Tables']['review']['Row'];
type ReviewImage = Database['public']['Tables']['review_image']['Row'];
type ReviewProduct = Database['public']['Tables']['review_product']['Row'];
type Reward = Database['public']['Tables']['reward']['Row'];
type User = Database['public']['Tables']['user']['Row'];

/**
 * useMutation 에서 사용하는 상황별 로직
 */
export type MutationCallback = {
	onSuccess?(): void;
	onMutate?(): void;
	onError?(error: Error): void;
	onSettled?(): void;
};
