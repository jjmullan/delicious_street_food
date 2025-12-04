import { TriangleIcon } from 'lucide-react';

function CurrentLocation() {
	return (
		<div className="flex flex-col items-center gap-y-1">
			<TriangleIcon className="rotate-180 w-4 h-4 fill-[#e35c18] animate-bounce" />
			<div className="relative w-6 h-6">
				{/* 항상 보이는 gradient border (가장 뒤) - 크기 증가 */}
				<div className="absolute inset-[-8px] rounded-full animate-show-border bg-gradient p-1" />

				{/* 펄스 애니메이션 링 (중간) */}
				<div className="absolute inset-0 rounded-full animate-pulse-ring bg-gradient-marker p-1" />

				{/* 중앙 검은색 원 (가장 앞) */}
				<div className="absolute inset-0 rounded-full bg-black m-1 z-1" />
			</div>
		</div>
	);
}

export default CurrentLocation;
