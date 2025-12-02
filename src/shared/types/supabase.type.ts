export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	// Allows to automatically instantiate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: '13.0.5';
	};
	public: {
		Tables: {
			location: {
				Row: {
					created_at: string;
					latitude: string;
					location_address: string | null;
					location_id: string;
					location_name: string | null;
					longitude: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					latitude: string;
					location_address?: string | null;
					location_id?: string;
					location_name?: string | null;
					longitude: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					latitude?: string;
					location_address?: string | null;
					location_id?: string;
					location_name?: string | null;
					longitude?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			product: {
				Row: {
					created_at: string;
					product_id: string;
					product_name: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					product_id?: string;
					product_name: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					product_id?: string;
					product_name?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			product_list: {
				Row: {
					created_at: string;
					location_id: string | null;
					product_id: string | null;
					product_list_id: string;
					total_recommend_count: number;
					total_review_count: number;
					total_unrecommend_count: number;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					location_id?: string | null;
					product_id?: string | null;
					product_list_id?: string;
					total_recommend_count?: number;
					total_review_count?: number;
					total_unrecommend_count?: number;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					location_id?: string | null;
					product_id?: string | null;
					product_list_id?: string;
					total_recommend_count?: number;
					total_review_count?: number;
					total_unrecommend_count?: number;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'product_list_location_id_fkey';
						columns: ['location_id'];
						isOneToOne: false;
						referencedRelation: 'location';
						referencedColumns: ['location_id'];
					},
					{
						foreignKeyName: 'product_list_product_id_fkey';
						columns: ['product_id'];
						isOneToOne: false;
						referencedRelation: 'product';
						referencedColumns: ['product_id'];
					},
				];
			};
			review: {
				Row: {
					created_at: string;
					location_id: string;
					review_id: string;
					review_text: string;
					review_title: string;
					updated_at: string;
					user_id: string;
					visit_date: string;
				};
				Insert: {
					created_at?: string;
					location_id?: string;
					review_id?: string;
					review_text: string;
					review_title: string;
					updated_at?: string;
					user_id?: string;
					visit_date: string;
				};
				Update: {
					created_at?: string;
					location_id?: string;
					review_id?: string;
					review_text?: string;
					review_title?: string;
					updated_at?: string;
					user_id?: string;
					visit_date?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'review_location_id_fkey';
						columns: ['location_id'];
						isOneToOne: false;
						referencedRelation: 'location';
						referencedColumns: ['location_id'];
					},
					{
						foreignKeyName: 'review_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'user';
						referencedColumns: ['user_id'];
					},
				];
			};
			review_image: {
				Row: {
					created_at: string;
					review_id: string;
					review_image_id: string;
				};
				Insert: {
					created_at?: string;
					review_id?: string;
					review_image_id?: string;
				};
				Update: {
					created_at?: string;
					review_id?: string;
					review_image_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'review_image_review_id_fkey';
						columns: ['review_id'];
						isOneToOne: false;
						referencedRelation: 'review';
						referencedColumns: ['review_id'];
					},
				];
			};
			review_product: {
				Row: {
					created_at: string;
					is_recommended: boolean | null;
					product_id: string;
					review_id: string;
					review_product_id: string;
				};
				Insert: {
					created_at?: string;
					is_recommended?: boolean | null;
					product_id?: string;
					review_id?: string;
					review_product_id?: string;
				};
				Update: {
					created_at?: string;
					is_recommended?: boolean | null;
					product_id?: string;
					review_id?: string;
					review_product_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'review_product_product_id_fkey';
						columns: ['product_id'];
						isOneToOne: false;
						referencedRelation: 'product';
						referencedColumns: ['product_id'];
					},
					{
						foreignKeyName: 'review_product_review_id_fkey';
						columns: ['review_id'];
						isOneToOne: false;
						referencedRelation: 'review';
						referencedColumns: ['review_id'];
					},
				];
			};
			reward: {
				Row: {
					created_at: string;
					reward_id: string;
					reward_name: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					reward_id?: string;
					reward_name: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					reward_id?: string;
					reward_name?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			user: {
				Row: {
					bio: string | null;
					created_at: string;
					nickname: string;
					profile_image_url: string | null;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					bio?: string | null;
					created_at?: string;
					nickname: string;
					profile_image_url?: string | null;
					updated_at?: string;
					user_id?: string;
				};
				Update: {
					bio?: string | null;
					created_at?: string;
					nickname?: string;
					profile_image_url?: string | null;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
		? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema['CompositeTypes']
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never,
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
		? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {},
	},
} as const;
