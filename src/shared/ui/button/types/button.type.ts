export type EditDeleteButtonType = {
	onDelete(): void;
	onUpdate?(): void;
};

export type PrevNextButtonType = {
	disabled?: boolean;
	onClick(): void;
	mode: 'main' | 'sub';
	title: string;
};
