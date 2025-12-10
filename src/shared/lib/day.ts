export const days = ['일', '월', '화', '수', '목', '금', '토'];

export function getNowDayKo(datetime: string) {
	const nowDay = days[new Date(datetime).getDay()];
	return nowDay;
}

export function getNowDateTimeKo() {
	const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
	const dateTimeLocalValue = now.toISOString().slice(0, 16);

	return dateTimeLocalValue;
}
