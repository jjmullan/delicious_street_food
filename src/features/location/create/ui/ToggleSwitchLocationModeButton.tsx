import { MapPlusIcon } from 'lucide-react';
import { useIsCreateMode, useSetIsCreateMode } from '@/app/store/createLocationStore';

function ToggleSwitchLocationModeButton() {
	const isUpdateMode = useIsCreateMode();
	const setIsUpdateMode = useSetIsCreateMode();
	const toggleIsUpdateMode = () => {
		setIsUpdateMode(isUpdateMode);
	};

	return (
		<button type="button" className={`w-12 h-15 flex justify-center items-center`} onClick={toggleIsUpdateMode}>
			<MapPlusIcon width={24} color={isUpdateMode ? '#d4944a' : '#212121'} />
		</button>
	);
}

export default ToggleSwitchLocationModeButton;
