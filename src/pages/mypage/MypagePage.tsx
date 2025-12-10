import { useParams } from 'react-router';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';
import NonMapHeader from '@/widgets/header/NonMapHeader';

function MyPagePage() {
	// 유저 정보 가져오기
	const param = useParams();
	const userId = param.userId;
	const { data: user, isPending } = useFecthUserData(userId);

	// 유저 상세 정보
	const nickname = user?.nickname;

	return (
		<div className="h-full">
			<h3 className="">안녕하세요, {nickname}님!</h3>
		</div>
	);
}

export default MyPagePage;
