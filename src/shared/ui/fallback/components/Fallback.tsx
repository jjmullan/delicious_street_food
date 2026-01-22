import type { FallbackType } from '@shared/ui/fallback/types/fallback.type';
import { LoaderCircleIcon } from 'lucide-react';

export default function Fallback({ title = '로딩 중', bgColor, isText }: FallbackType) {
	return (
		<div
			className={
				isText
					? ''
					: `absolute top-0 full-width min-h-svh z-99 flex gap-x-2 items-center justify-center ${bgColor ? bgColor : 'bg-white/50'}`
			}
		>
			<LoaderCircleIcon className="animate-spin" />
			<p className="text-black">{title}</p>
		</div>
	);
}
