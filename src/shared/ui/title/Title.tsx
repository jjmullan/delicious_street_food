import logo from '/logo.svg';

function Title() {
	return (
		<div className="flex flex-col justify-end items-center gap-y-3 mb-10">
			<img src={logo} alt="logo" className="w-[120px]" />
			<h2 className="title">포장맛차</h2>
		</div>
	);
}

export default Title;
