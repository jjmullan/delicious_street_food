import { LoaderCircleIcon } from 'lucide-react';

function FallbackRequestAPI({ bgColor }: { bgColor?: string }) {
	return (
		<div
			className={`absolute top-0 full-width min-h-svh z-99 flex gap-x-2 items-center justify-center ${bgColor ? bgColor : 'bg-white/50'}`}
		>
			<LoaderCircleIcon className="animate-spin" />
			<p className="text-black">로딩 중</p>
		</div>
	);
}

export default FallbackRequestAPI;
