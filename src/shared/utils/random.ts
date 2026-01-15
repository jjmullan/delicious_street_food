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
