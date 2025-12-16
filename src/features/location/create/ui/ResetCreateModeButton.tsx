import { Undo2Icon } from 'lucide-react';
import { useIsCreateMode, useSetIsCreateMode } from '@/app/store/createLocationStore';

function ResetCreateModeButton() {
	const isCreateMode = useIsCreateMode();
	const setIsCreateMode = useSetIsCreateMode();
	const toggleCreateMode = () => {
		setIsCreateMode(isCreateMode);
	};

	return (
		<div className="full-width pl-6">
			<button
				type="button"
				className="fixed glass bottom-11 w-14 h-14 aspect-square rounded-full z-1 flex justify-center items-center"
				onClick={toggleCreateMode}
			>
				<Undo2Icon width={28} height={28} strokeWidth={1.5} />
			</button>
		</div>
	);
}

export default ResetCreateModeButton;
