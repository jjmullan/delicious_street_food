function LocationFinderSkeleton() {
	return (
		<div className="relative w-8 h-8">
			{/* 항상 보이는 gradient border (가장 뒤) - 크기 증가 */}
			<div className="absolute inset-[-12px] rounded-full bg-gradient-to-r from-gray-200 to-gray-300 p-1 animate-pulse" />

			{/* 펄스 애니메이션 링 (중간) */}
			<div className="absolute inset-0 rounded-full bg-gray-200 p-1 animate-pulse" />

			{/* 중앙 스켈레톤 원 (가장 앞) */}
			<div className="absolute inset-0 rounded-full m-1 z-1 flex items-center justify-center bg-gray-300 animate-pulse">
				<div className="w-8 h-8 rounded-full bg-gray-400" />
			</div>
		</div>
	);
}

export default LocationFinderSkeleton;
