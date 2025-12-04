import { PlusIcon } from 'lucide-react';

function LocationFinder({ bgColorCode = '0' }: { bgColorCode: string }) {
	let colorCode: string;
	switch (bgColorCode) {
		case '0':
			colorCode = 'bg-black';
			break;
		case '1':
			colorCode = 'bg-brown-main';
			break;
		case '2':
			colorCode = 'bg-brown-sub';
			break;
		default:
			colorCode = 'bg-black';
	}

	return (
		<div className="relative w-6 h-6">
			{/* 항상 보이는 gradient border (가장 뒤) - 크기 증가 */}
			<div className="absolute inset-[-8px] rounded-full animate-show-border bg-gradient p-1" />

			{/* 펄스 애니메이션 링 (중간) */}
			<div className="absolute inset-0 rounded-full animate-pulse-ring bg-gradient-marker p-1" />

			{/* 중앙 검은색 원 (가장 앞) */}
			{bgColorCode === '0' ? (
				<div className={`absolute inset-0 rounded-full ${colorCode} m-1 z-1`} />
			) : (
				// 추후 디자인 수정 예정
				<div className={`absolute inset-0 rounded-full ${colorCode} m-1 z-1 flex items-center justify-center`} />
			)}
		</div>
	);
}

export default LocationFinder;
