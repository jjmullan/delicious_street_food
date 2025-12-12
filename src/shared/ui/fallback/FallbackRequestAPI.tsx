import { LoaderCircleIcon } from 'lucide-react';

function FallbackRequestAPI({ bgColor, title = '로딩 중' }: { bgColor?: string; title?: string }) {
	return (
		<div
			className={`absolute top-0 full-width min-h-svh z-99 flex gap-x-2 items-center justify-center ${bgColor ? bgColor : 'bg-white/50'}`}
		>
			<LoaderCircleIcon className="animate-spin" />
			<p className="text-black">{title}</p>
		</div>
	);
}

export default FallbackRequestAPI;
