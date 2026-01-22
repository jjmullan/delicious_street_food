import { useIsCreateMode, useSetIsCreateMode } from '@features/location';
import { MapPlusIcon } from 'lucide-react';
import { Activity, useEffect, useState } from 'react';

function ToggleSwitchLocationModeButton() {
	const isCreateMode = useIsCreateMode();
	const setIsUpdateMode = useSetIsCreateMode();
	const toggleIsUpdateMode = () => {
		setIsUpdateMode(isCreateMode);
	};

	// 10초 후에 안내 텍스트 안보이게 하기
	const [isShowInfoText, setIsShowInfoText] = useState(true);
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsShowInfoText(false);
		}, 10_000);

		return () => clearTimeout(timer);
	}, [isShowInfoText]);

	return (
		<div className="relative">
			<button
				type="button"
				className={`w-18 h-18 flex justify-center items-center`}
				onClick={toggleIsUpdateMode}
				aria-label="위치 생성 모드 전환"
			>
				<Activity mode={isCreateMode ? 'hidden' : 'visible'}>
					<div className="flex flex-col items-center gap-y-1">
						<MapPlusIcon width={24} color={'#212121'} strokeWidth={1.8} />
						<p className="text-xs font-medium">생성모드</p>
					</div>
				</Activity>
			</button>
			{/* <Activity mode={isUpdateMode ? 'hidden' : 'visible'}>
				<Activity mode={isShowInfoText ? 'visible' : 'hidden'}>
					<div className="absolute font-medium top-[-16px] left-[-18px] bg-brown-sub text-white rounded-full px-2 py-1 w-42 text-xs animate-bounce flex items-center justify-center">
						새로운 포장마차를 발견했다면?
						<TriangleIcon
							width={12}
							className="absolute left-12 bottom-[-12px] rotate-180"
							color="#e8b577"
							fill="#e8b577"
						/>
					</div>
				</Activity>
			</Activity> */}
		</div>
	);
}

export default ToggleSwitchLocationModeButton;
