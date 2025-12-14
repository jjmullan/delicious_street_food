import { useParams } from 'react-router';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';
import LoggedInDetailHeader from '@/widgets/header/LoggedInDetailHeader';

function MyPagePage() {
	// 유저 정보 가져오기
	const param = useParams();
	const userId = param.userId;
	const { data: fetchUser, isPending: isFetchUserPending } = useFecthUserData(userId);

	// 유저 상세 정보
	const nickname = fetchUser?.nickname;

	return (
		<>
			<LoggedInDetailHeader title="마이페이지" />
			<main className="mt-12 p-3">
				<div className="h-full">
					<h3 className="">안녕하세요, {nickname}님!</h3>
				</div>
			</main>
		</>
	);
}

export default MyPagePage;
