import type { Item } from '@/features/product/item/types/item.type';

const ITEM_PUBLIC_LINK = '/character/';
const EXTENSION = '.svg';

export const items: Item[] = [
	{
		name: '붕어빵',
		image_url: `${ITEM_PUBLIC_LINK}fishshapedbun${EXTENSION}`,
	},
	{
		name: '호떡',
		image_url: `${ITEM_PUBLIC_LINK}hotteok${EXTENSION}`,
	},
	{
		name: '호빵',
		image_url: `${ITEM_PUBLIC_LINK}hoppang${EXTENSION}`,
	},
	{
		name: '계란빵',
		image_url: `${ITEM_PUBLIC_LINK}eggbun${EXTENSION}`,
	},
	{
		name: '군고구마',
		image_url: `${ITEM_PUBLIC_LINK}roastedsweetpotato${EXTENSION}`,
	},
	{
		name: '군밤',
		image_url: `${ITEM_PUBLIC_LINK}roastedchestnuts${EXTENSION}`,
	},
	{
		name: '호두과자',
		image_url: `${ITEM_PUBLIC_LINK}walnutcake${EXTENSION}`,
	},
];
