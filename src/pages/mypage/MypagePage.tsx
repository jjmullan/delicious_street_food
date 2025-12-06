import { useParams } from 'react-router';

function MyPage() {
	const param = useParams();
	const userId = param.userId;

	return <h1>{userId}의 프로필 상세페이지</h1>;
}

export default MyPage;
