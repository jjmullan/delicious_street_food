export const days = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * 특정 시간을 요일로 치환해서 보여주는 함수
 * @param datetime
 */
export function getNowDayKo(datetime: string) {
	const nowDay = days[new Date(datetime).getDay()];
	return nowDay;
}

/**
 * 현재 시간을 한국 시간으로 치환해서 보여주는 함수
 */
export function getNowDateTimeKo() {
	const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
	const dateTimeLocalValue = now.toISOString().slice(0, 16);

	return dateTimeLocalValue;
}

/**
 * 특정 시간을 Supabase 의 timestampz 타입에 맞게 치환해서 보여주는 함수
 * @param date
 */
export function getDateTimeKo(date: number) {
	const now = new Date(date);
	const dateTimeLocalValue = now.toLocaleString('ko-KR', {
		dateStyle: 'full',
		timeStyle: 'short',
	});

	return dateTimeLocalValue;
}

/**
 * 현재 시간과 created_at 시간의 차이를 계산해서 동적으로 보여주는 함수
 * @param time
 */
export function formatTimeAgo(time: Date | string | number) {
	const start = new Date(time);
	const end = new Date();

	const secondDiff = Math.floor((end.getTime() - start.getTime()) / 1_000);
	if (secondDiff < 60) return '방금 전';

	const minuteDiff = Math.floor(secondDiff / 60);
	if (minuteDiff < 60) return `${minuteDiff}분 전`;

	const hourDiff = Math.floor(minuteDiff / 60);
	if (hourDiff < 24) return `${hourDiff}시간 전`;

	const dayDiff = Math.floor(hourDiff / 24);
	if (dayDiff < 3) return `${dayDiff}일 전`;

	return new Date(time).toLocaleString('ko-KR', {
		dateStyle: 'full',
		timeStyle: 'short',
	});
}
