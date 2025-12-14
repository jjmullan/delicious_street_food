function ReviewUserProfile({
	profileImage,
	nickname,
	createDatetime,
}: {
	profileImage: string;
	nickname: string;
	createDatetime: string;
}) {
	return (
		<div className="flex items-center gap-x-2.5">
			<div className="w-9 h-9">
				<img src={profileImage} alt="프로필 이미지" className="w-full h-full object-cover" />
			</div>
			<div className="flex flex-col">
				<p className="text-sm font-semibold">{nickname}</p>
				<p className="text-xs text-muted-foreground">{createDatetime}</p>
			</div>
		</div>
	);
}

export default ReviewUserProfile;
