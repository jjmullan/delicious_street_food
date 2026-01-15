// ImageModal 타입
export type ImageModalProps = {
	imageUrl: string;
	isOpen: boolean;
	onClose: () => void;
};

// 전역 상태 ConfirmModal 타입
export type OpenState = {
	isOpen: true;
	title: string;
	description: string;
	onPositive?(): void;
	onNegative?(): void;
};

export type CloseState = {
	isOpen: false;
};

export type ConfirmModalState = CloseState | OpenState;
