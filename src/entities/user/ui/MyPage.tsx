import type { ImageURL } from '@features/review/create/types/image';
import useFecthUserData from '@features/user/fetch/hooks/useFecthUserData';
import useUpdateProfile from '@features/user/update/hooks/useUpdateProfile';
import useUpdateProfileImage from '@features/user/update/hooks/useUpdateProfileImage';
import validateNickname from '@features/user/update/libs/validateNickname';
import defaultavatar from '@shared/assets/character/defaultavatar.svg';
import { Button } from '@shared/ui/shadcn/button';
import { Input } from '@shared/ui/shadcn/input';
import { Textarea } from '@shared/ui/shadcn/textarea';
import type { Session } from '@supabase/supabase-js';
import { Activity, useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router';

function MyPage() {
	const { session } = useOutletContext<{ session: Session }>();
	const user_id = session.user.id;

	// 유저 정보 패칭
	const { data: fetchUser, isPending: isFetchUserPending } = useFecthUserData(user_id);
	const origin_nickname = fetchUser?.nickname;
	const origin_bio = fetchUser?.bio ?? `한 줄 소개를 입력해주세요`;
	const origin_profile_image = fetchUser?.profile_image_url ?? defaultavatar;

	// 프로필 이미지 업데이트 API
	const { mutateAsync: updateProfileImage, isPending: isUpdateProfileImagePending } = useUpdateProfileImage({});
	const { mutateAsync: updateProfile, isPending: isUpdateProfilePending } = useUpdateProfile({});

	// 유저 정보 수정
	const [editMode, setEditMode] = useState(false);
	const [nickname, setNickname] = useState('');
	const [bio, setBio] = useState('');
	const [profileImage, setProfileImage] = useState<ImageURL | null>();
	const [nicknameError, setNicknameError] = useState<string>('');

	// fetchUser 데이터 로딩 시 nickname, bio 동기화
	useEffect(() => {
		if (fetchUser) {
			setNickname(fetchUser.nickname || '');
			setBio(fetchUser.bio || '');
			setNicknameError('');
		}
	}, [fetchUser]);

	// 닉네임 변경 핸들러
	const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newNickname = e.target.value;
		setNickname(newNickname);

		// 닉네임 유효성 검증
		const validation = validateNickname(newNickname);
		if (!validation.isValid) {
			setNicknameError(validation.errorMessage || '');
		} else {
			setNicknameError('');
		}
	};

	// 프로필 이미지 수정
	const profileImageRef = useRef<HTMLInputElement>(null);
	const handleChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const file = e.target.files[0];
		if (profileImage) {
			URL.revokeObjectURL(profileImage.previewUrl);
		}
		setProfileImage({ file, previewUrl: URL.createObjectURL(file) });
	};

	// 유저 정보 수정 요청
	const handleClickEditProfile = async () => {
		try {
			// 닉네임 유효성 검증
			const validation = validateNickname(nickname);
			if (!validation.isValid) {
				setNicknameError(validation.errorMessage || '');
				return;
			}

			// 변경 사항 체크
			const isNicknameChanged = nickname !== origin_nickname;
			const isBioChanged = bio !== (fetchUser?.bio || '');
			const isProfileImageChanged = !!profileImage;

			// 변경 사항이 없으면 중단
			if (!isNicknameChanged && !isBioChanged && !isProfileImageChanged) {
				setEditMode(false);
				return;
			}

			// 프로필 정보(nickname, bio) 업데이트
			if (isNicknameChanged || isBioChanged) {
				await updateProfile({ user_id, nickname, bio });
			}

			// 프로필 이미지 업데이트
			if (isProfileImageChanged) {
				await updateProfileImage({ user_id, image: profileImage });
			}
		} catch (error) {
			console.error(error);
		} finally {
			setEditMode(false);
			setProfileImage(null);
		}
	};

	// Pending 상태 통합 관리
	const isPending = isFetchUserPending || isUpdateProfileImagePending || isUpdateProfilePending;

	// disabled 상태 통합 관리
	const disabled = nickname === '' || nicknameError !== '' || nickname === origin_nickname || bio === origin_bio;

	return (
		<div className="flex flex-col justify-center items-center min-h-[calc(100svh-48px)] relative">
			<Activity mode={editMode ? 'hidden' : 'visible'}>
				<section className="flex flex-col justify-center items-center gap-y-4">
					<h3 className="sr-only">프로필</h3>
					{/* 프로필 이미지 */}
					<div className="relative h-28 w-28">
						<div className="absolute inset-0 border rounded-full">{/* 여기에 리워드 이미지 추가 */}</div>
						<img src={origin_profile_image} className="cursor-pointer rounded-full object-cover" alt="user profile" />
					</div>
					{/* 프로필 설명 */}
					<div className="flex flex-col items-center">
						<div className="flex items-center relative">
							<p className="text-xl font-bold">{origin_nickname}</p>
						</div>
						<div className="flex items-center relative">
							<p className="text-muted-foreground">{origin_bio}</p>
						</div>
					</div>
					{/* 프로필 수정 */}
					<Button type="button" onClick={() => setEditMode(true)}>
						프로필 수정
					</Button>
				</section>
			</Activity>
			<Activity mode={editMode ? 'visible' : 'hidden'}>
				<section className="flex flex-col justify-center items-center gap-y-4 w-full px-8">
					<h3 className="sr-only">프로필 수정</h3>
					{/* 프로필 이미지 */}
					<input type="file" id="profile_image" hidden ref={profileImageRef} onChange={handleChangeProfileImage} />
					<label htmlFor="profile_image">
						<button
							type="button"
							className="relative h-28 w-28"
							onClick={() => {
								if (profileImageRef.current) profileImageRef.current.click();
							}}
						>
							<div className="absolute inset-0 border rounded-full">{/* 여기에 리워드 이미지 추가 */}</div>
							<img
								src={profileImage?.previewUrl ?? origin_profile_image}
								className="cursor-pointer rounded-full w-full h-full object-cover"
								alt="user profile"
							/>
						</button>
					</label>
					{/* 프로필 설명 */}
					<div className="flex flex-col items-center gap-y-2 w-full">
						<div className="w-full">
							<Input
								type="text"
								placeholder="닉네임(15자 이내)"
								maxLength={15}
								value={nickname}
								onChange={handleNicknameChange}
								className="text-sm"
							/>
							{nicknameError && <p className="text-red-500 text-xs mt-1">{nicknameError}</p>}
						</div>
						<Textarea
							placeholder="한 줄 소개(30자 이내)"
							maxLength={30}
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							className="text-sm resize-y"
						/>
					</div>
					{/* 프로필 수정 */}
					<div className="flex gap-x-2 w-full">
						<Button
							type="button"
							onClick={handleClickEditProfile}
							className="flex-1 w-full"
							disabled={isPending || disabled}
						>
							수정 완료
						</Button>
						<Button
							type="button"
							variant={'outline'}
							onClick={() => {
								// 원래 값으로 리셋
								setNickname(origin_nickname || '');
								setBio(fetchUser?.bio || '');
								setNicknameError('');
								setEditMode(false);
							}}
							className="flex-1 w-full"
						>
							취소
						</Button>
					</div>
				</section>
			</Activity>
			{/* <section className="fixed bottom-0 p-6">
  				<h3 className="sr-only">마이페이지 배경 설정</h3>
  				<div className="flex gap-x-2">
  					<div className="w-20 h-20 border rounded-md flex items-center justify-center bg-[#fff]">
  						<img src={fishshapedbun} alt="믹스 테마" className="w-16 h-16" />
  					</div>
  					<div className="w-20 h-20 border rounded-md flex items-center justify-center bg-[#fff]">
  						<img src={fishshapedbun} alt="붕어빵 테마" className="w-16 h-16" />
  					</div>
  					<div className="w-20 h-20 border rounded-md flex items-center justify-center bg-[#fff]">
  						<img src={hoppang} alt="호빵 테마" className="w-16 h-16" />
  					</div>
  					<div className="w-20 h-20 border rounded-md flex items-center justify-center bg-[#fff]"></div>
  				</div>
  			</section> */}
		</div>
	);
}

export default MyPage;
