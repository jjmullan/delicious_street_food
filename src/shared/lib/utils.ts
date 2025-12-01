import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { expressions, foods } from '@/shared/lib/nickname';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getRandomUserNickname() {
	const expression = expressions[Math.floor(Math.random() * expressions.length)];
	const food = foods[Math.floor(Math.random() * foods.length)];
	const number = Math.floor(Math.random() * 9_999);
	return `${expression}${food}${number}`;
}
