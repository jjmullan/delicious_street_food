import { expressions, foods } from '@features/profile/lib/constants/nickname';

export function getRandomUserNickname() {
	const expression = expressions[Math.floor(Math.random() * expressions.length)];
	const food = foods[Math.floor(Math.random() * foods.length)];
	const number = Math.floor(Math.random() * 9_999);
	return `${expression}${food}${number}`;
}
