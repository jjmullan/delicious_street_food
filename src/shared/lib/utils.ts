import { expressions, foods } from '@shared/lib/nickname';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getRandomUserNickname() {
	const expression = expressions[Math.floor(Math.random() * expressions.length)];
	const food = foods[Math.floor(Math.random() * foods.length)];
	const number = Math.floor(Math.random() * 9_999);
	return `${expression}${food}${number}`;
}

/**
 * 배열에서 임의의 요소 하나를 추출하는 함수
 * @param array - 추출할 배열
 * @returns 배열이 비어있으면 null, 아니면 임의의 요소 반환
 */
export function getRandomArrayItem<T>(array: T[]): T | null {
	if (!array || array.length === 0) return null;
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}
