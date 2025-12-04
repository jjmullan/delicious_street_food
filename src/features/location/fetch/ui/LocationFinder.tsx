function LocationFinder({ bgColor }: { bgColor: string }) {
	return (
		<div className="relative w-6 h-6">
			{/* 항상 보이는 gradient border (가장 뒤) - 크기 증가 */}
			<div className="absolute inset-[-8px] rounded-full animate-show-border bg-gradient p-1" />

			{/* 펄스 애니메이션 링 (중간) */}
			<div className="absolute inset-0 rounded-full animate-pulse-ring bg-gradient-marker p-1" />

			{/* 중앙 검은색 원 (가장 앞) */}
			<div className={`absolute inset-0 rounded-full bg-${bgColor} m-1 z-1`} />
		</div>
	);
}

export default LocationFinder;
