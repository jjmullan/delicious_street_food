import { useParams } from 'react-router';
import NonMapHeader from '@/widgets/header/NonMapHeader';

function MyPage() {
	const param = useParams();
	const userId = param.userId;

	return (
		<>
			<NonMapHeader mode={'extra'} />
			<h1>{userId}의 프로필 상세페이지</h1>
		</>
	);
}

export default MyPage;
