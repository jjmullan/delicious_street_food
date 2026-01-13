import useFetchFavorite from '@features/favorite/hooks/useFetchFavorite';
import useToggleFavorite from '@features/favorite/hooks/useToggleFavorite';
import { Button } from '@shared/ui/shadcn/button';
import { HeartIcon } from 'lucide-react';

function ToggleFavoriteButton({ location_id, user_id }: { location_id: string; user_id: string }) {
	const { data: favorites } = useFetchFavorite(location_id);
	const { mutate: toggleFavorite } = useToggleFavorite(location_id, user_id);

	// 현재 사용자의 즐겨찾기 찾기
	const userFavorite = favorites?.find((favorite) => favorite.user_id === user_id);
	const isFavorited = !!userFavorite;

	const handleToggleFavorite = () => {
		if (userFavorite) {
			// 즐겨찾기가 있으면 삭제
			toggleFavorite({ action: 'remove', favoriteId: userFavorite.favorite_id });
		} else {
			// 즐겨찾기가 없으면 추가
			toggleFavorite({ action: 'add' });
		}
	};

	return (
		<Button
			type="button"
			variant={'outline'}
			className={`flex-1 ${isFavorited && 'border-2 border-brown-main'}`}
			onClick={handleToggleFavorite}
		>
			<HeartIcon width={20} height={20} strokeWidth={1.5} fill={isFavorited ? '#d4944a' : '#fff'} />
			<p className="text-sm">{isFavorited ? '저장됨' : '저장하기'}</p>
		</Button>
	);
}

export default ToggleFavoriteButton;
