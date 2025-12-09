import { Map, MapPlusIcon } from 'lucide-react';
import { Activity } from 'react';
import { useIsCreateMode, useSetIsCreateMode } from '@/app/store/createLocationStore';

function ToggleSwitchLocationModeButton() {
	const isUpdateMode = useIsCreateMode();
	const setIsUpdateMode = useSetIsCreateMode();
	const toggleIsUpdateMode = () => {
		setIsUpdateMode(isUpdateMode);
	};

	return (
		<button type="button" className={`w-12 h-15 flex justify-center items-center`} onClick={toggleIsUpdateMode}>
			{/* 위치 생성 모드 상태에 따라 아이콘 변경 */}
			<Activity mode={isUpdateMode ? 'visible' : 'hidden'}>
				<Map width={24} color={'#212121'} />
			</Activity>
			<Activity mode={isUpdateMode ? 'hidden' : 'visible'}>
				<MapPlusIcon width={24} color={'#212121'} />
			</Activity>
		</button>
	);
}

export default ToggleSwitchLocationModeButton;
