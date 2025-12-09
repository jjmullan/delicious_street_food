import { Map, MapPlusIcon } from 'lucide-react';
import { Activity, useEffect, useRef, useState } from 'react';
import { useIsCreateMode, useSetIsCreateMode } from '@/app/store/createLocationStore';

function ToggleSwitchLocationModeButton() {
	const isUpdateMode = useIsCreateMode();
	const setIsUpdateMode = useSetIsCreateMode();
	const toggleIsUpdateMode = () => {
		setIsUpdateMode(isUpdateMode);
	};

	// 5초 후에 안내 텍스트 안보이게 하기
	const [isShowInfoText, setIsShowInfoText] = useState(true);
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsShowInfoText(false);
		}, 5_000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="relative">
			<button type="button" className={`w-12 h-15 flex justify-center items-center`} onClick={toggleIsUpdateMode}>
				{/* 위치 생성 모드 상태에 따라 아이콘 변경 */}
				<Activity mode={isUpdateMode ? 'visible' : 'hidden'}>
					<Map width={24} color={'#212121'} />
				</Activity>
				<Activity mode={isUpdateMode ? 'hidden' : 'visible'}>
					<MapPlusIcon width={24} color={'#212121'} />
				</Activity>
			</button>
			<Activity mode={isUpdateMode ? 'hidden' : 'visible'}>
				<Activity mode={isShowInfoText ? 'visible' : 'hidden'}>
					<div className="absolute font-semibold top-[-10px] left-[-36px] bg-brown-sub text-white rounded-full px-2 py-1 w-32 text-[10px] animate-bounce flex items-center justify-center">
						포장마차가 지도에 없다면?
					</div>
				</Activity>
			</Activity>
		</div>
	);
}

export default ToggleSwitchLocationModeButton;
