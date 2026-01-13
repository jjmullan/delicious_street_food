import type { ImageURL } from '@features/review/types/image';
import { XIcon } from 'lucide-react';

function PreviewImage({ image, index, onDelete }: { image: ImageURL; index: number; onDelete(image: ImageURL): void }) {
	return (
		<div className="relative border rounded-md overflow-hidden aspect-square">
			<img src={image.previewUrl} alt={`미리보기 ${index}번`} className="w-full h-full object-contain" />
			<button
				type="button"
				className="absolute top-2 right-2 p-0.5 bg-black/30 rounded-md"
				onClick={() => onDelete(image)}
			>
				<XIcon width={16} height={16} color="#fff" />
			</button>
		</div>
	);
}

export default PreviewImage;
