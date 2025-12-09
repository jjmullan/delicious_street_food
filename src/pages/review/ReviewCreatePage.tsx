import { useParams } from 'react-router';
import { useSession } from '@/app/store/sessionStore';
import useFetchProducts from '@/features/product/item/hooks/useFetchProducts';

function ReviewCreatePage() {
	// 포장마차 위치 정보 가져오기
	const param = useParams();
	const location_id = param.locationId;

	// 전체 상품 목록 패칭
	const { data: products } = useFetchProducts();

	// 유저 아이디 패칭
	const session = useSession();
	const user_id = session?.user.id;

	return (
		<>
			<p>{location_id}</p>
			<p>{user_id}</p>
		</>
	);
}

export default ReviewCreatePage;
