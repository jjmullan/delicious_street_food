import type { ImageModalProps } from '@shared/ui/modal/types/modal.type';
import { useEffect } from 'react';

export default function ImageModal({ imageUrl, isOpen, onClose }: ImageModalProps) {
	// ESC 키로 모달 닫기
	useEffect(() => {
		if (!isOpen) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		// 모달이 열릴 때 body 스크롤 방지
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<button
			type="button"
			className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3"
			onClick={onClose}
			onKeyDown={(e) => e.key === 'Enter' && onClose()}
			tabIndex={0}
			aria-label="배경 클릭하여 닫기"
		>
			<img
				src={imageUrl}
				alt="확대된 이미지"
				className="w-full h-full max-w-[768px] aspect-auto max-h-full object-contain"
			/>
		</button>
	);
}
