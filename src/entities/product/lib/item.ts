import type { Item } from '@entities/product/model/item.type';

export const items: Item[] = [
	{
		name_ko: '붕어빵',
		name_en: 'fishshapedbun',
	},
	{
		name_ko: '호떡',
		name_en: 'hotteok',
	},
	{
		name_ko: '호빵',
		name_en: 'hoppang',
	},
	{
		name_ko: '계란빵',
		name_en: 'eggbun',
	},
	{
		name_ko: '군고구마',
		name_en: 'roastedsweetpotato',
	},
	{
		name_ko: '군밤',
		name_en: 'roastedchestnuts',
	},
	{
		name_ko: '호두과자',
		name_en: 'walnutcake',
	},
	{
		name_ko: '땅콩방',
		name_en: 'peanutbread',
	},
	{
		name_ko: '떡볶이',
		name_en: 'tteokbokki',
	},
];

import eggbun from '@shared/assets/character/eggbun.svg';
import fishshapedbun from '@shared/assets/character/fishshapedbun.svg';
import hoppang from '@shared/assets/character/hoppang.svg';
import hotteok from '@shared/assets/character/hotteok.svg';
import peanutbread from '@shared/assets/character/peanutbread.svg';
import roastedchestnuts from '@shared/assets/character/roastedchestnuts.svg';
import roastedsweetpotato from '@shared/assets/character/roastedsweetpotato.svg';
import tteokbokki from '@shared/assets/character/tteokbokki.svg';
import walnutcake from '@shared/assets/character/walnutcake.svg';

// 캐릭터 이미지 매핑 객체
export const characterImages: Record<string, string> = {
	eggbun,
	fishshapedbun,
	hoppang,
	hotteok,
	roastedchestnuts,
	roastedsweetpotato,
	walnutcake,
	peanutbread,
	tteokbokki,
};
