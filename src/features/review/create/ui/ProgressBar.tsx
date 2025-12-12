function ProgressBar({ page }: { page: number }) {
	return (
		<div className="fixed px-3 pt-3 full-width h-fit bg-[#fff] z-2">
			<div className="grid grid-cols-3 h-2 rounded-full bg-muted auto-width">
				<div className={`rounded-full bg-brown-main ${page >= 2 && 'rounded-r-none'}`}></div>
				<div
					className={`rounded-full ${page >= 2 && 'bg-brown-main rounded-l-none'} ${page >= 3 && 'rounded-r-none'}`}
				></div>
				<div className={`rounded-full ${page >= 3 && 'bg-brown-main rounded-l-none'}`}></div>
			</div>
		</div>
	);
}

export default ProgressBar;
