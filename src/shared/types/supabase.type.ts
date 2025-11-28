export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	// Allows to automatically instantiate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: '13.0.5';
	};
	public: {
		Tables: {
			keyword: {
				Row: {
					created_at: string;
					keyword_id: number;
					keyword_name: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					keyword_id?: number;
					keyword_name: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					keyword_id?: number;
					keyword_name?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			location: {
				Row: {
					created_at: string;
					location_address: string;
					location_id: number;
					location_name: string | null;
					location_url: string;
					total_count: number;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					location_address: string;
					location_id?: number;
					location_name?: string | null;
					location_url: string;
					total_count?: number;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					location_address?: string;
					location_id?: number;
					location_name?: string | null;
					location_url?: string;
					total_count?: number;
					updated_at?: string;
				};
				Relationships: [];
			};
			member: {
				Row: {
					bio: string | null;
					country: string;
					created_at: string;
					member_id: string;
					member_image_url: string | null;
					nickname: string;
					updated_at: string;
				};
				Insert: {
					bio?: string | null;
					country?: string;
					created_at?: string;
					member_id?: string;
					member_image_url?: string | null;
					nickname: string;
					updated_at?: string;
				};
				Update: {
					bio?: string | null;
					country?: string;
					created_at?: string;
					member_id?: string;
					member_image_url?: string | null;
					nickname?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			member_reward: {
				Row: {
					created_at: string;
					member_id: string;
					member_reward_id: number;
					reward_id: number;
				};
				Insert: {
					created_at?: string;
					member_id?: string;
					member_reward_id?: number;
					reward_id: number;
				};
				Update: {
					created_at?: string;
					member_id?: string;
					member_reward_id?: number;
					reward_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'member_reward_member_id_fkey';
						columns: ['member_id'];
						isOneToOne: false;
						referencedRelation: 'member';
						referencedColumns: ['member_id'];
					},
					{
						foreignKeyName: 'member_reward_reward_id_fkey';
						columns: ['reward_id'];
						isOneToOne: false;
						referencedRelation: 'reward';
						referencedColumns: ['reward_id'];
					},
				];
			};
			product: {
				Row: {
					created_at: string;
					location_id: number;
					member_id: string;
					product_id: number;
					review_text: string | null;
					star_rating: number;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					location_id: number;
					member_id?: string;
					product_id?: number;
					review_text?: string | null;
					star_rating?: number;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					location_id?: number;
					member_id?: string;
					product_id?: number;
					review_text?: string | null;
					star_rating?: number;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'product_location_id_fkey';
						columns: ['location_id'];
						isOneToOne: false;
						referencedRelation: 'location';
						referencedColumns: ['location_id'];
					},
					{
						foreignKeyName: 'product_member_id_fkey';
						columns: ['member_id'];
						isOneToOne: false;
						referencedRelation: 'member';
						referencedColumns: ['member_id'];
					},
				];
			};
			product_image: {
				Row: {
					created_at: string;
					product_id: number;
					product_image_id: number;
					product_image_url: string;
				};
				Insert: {
					created_at?: string;
					product_id: number;
					product_image_id?: number;
					product_image_url: string;
				};
				Update: {
					created_at?: string;
					product_id?: number;
					product_image_id?: number;
					product_image_url?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'product_image_product_id_fkey';
						columns: ['product_id'];
						isOneToOne: false;
						referencedRelation: 'product';
						referencedColumns: ['product_id'];
					},
				];
			};
			product_keyword: {
				Row: {
					created_at: string;
					keyword_id: number;
					product_id: number;
					product_keyword_id: number;
				};
				Insert: {
					created_at?: string;
					keyword_id: number;
					product_id: number;
					product_keyword_id?: number;
				};
				Update: {
					created_at?: string;
					keyword_id?: number;
					product_id?: number;
					product_keyword_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'product_keyword_keyword_id_fkey';
						columns: ['keyword_id'];
						isOneToOne: false;
						referencedRelation: 'keyword';
						referencedColumns: ['keyword_id'];
					},
					{
						foreignKeyName: 'product_keyword_product_id_fkey';
						columns: ['product_id'];
						isOneToOne: false;
						referencedRelation: 'product';
						referencedColumns: ['product_id'];
					},
				];
			};
			reward: {
				Row: {
					created_at: string;
					reward_id: number;
					reward_name: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					reward_id?: number;
					reward_name: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					reward_id?: number;
					reward_name?: string;
					updated_at?: string;
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
