import { Button } from '@shared/ui/shadcn/components/button';
import { Share2Icon } from 'lucide-react';

export default function ShareLocationButton() {
	// 공유하기 버튼 동작
	const handleShare = async () => {
		try {
			const href = window.location.href;
			await navigator.share({
				title: '포장맛차',
				text: '현재 포장마차 위치 공유',
				url: href,
			});
		} catch (error) {
			console.error('위치 공유 오류: ', error);
		}
	};

	return (
		<Button type="button" variant={'outline'} className="flex-1" onClick={handleShare}>
			<Share2Icon width={20} height={20} strokeWidth={1.5} />
			<p className="text-sm">공유하기</p>
		</Button>
	);
}
