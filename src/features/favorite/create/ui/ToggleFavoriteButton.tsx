import { BookmarkIcon } from 'lucide-react';
import useFetchFavorite from '@/features/favorite/fetch/hooks/useFetchFavorite';
import { Button } from '@/shared/ui/shadcn/button';

function ToggleFavoriteButton({ location_id }: { location_id: string }) {
	const { data: fetchFavorite } = useFetchFavorite(location_id);
	const handleToggleFavorite = () => {};

	return (
		<Button type="button" variant={'outline'} className="flex-1" onClick={handleToggleFavorite}>
			<BookmarkIcon width={20} height={20} strokeWidth={1.5} />
			<p className="text-sm">저장하기</p>
		</Button>
	);
}

export default ToggleFavoriteButton;
