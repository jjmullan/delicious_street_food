import { Button } from '@/shared/ui/shadcn/button';

function PrevNextButton({
	disabled,
	onClick,
	mode,
	title,
}: {
	disabled?: boolean;
	onClick(): void;
	mode: 'main' | 'sub';
	title: string;
}) {
	return (
		<Button type="button" className={mode === 'sub' ? 'bg-muted text-black' : ''} disabled={disabled} onClick={onClick}>
			{title}
		</Button>
	);
}

export default PrevNextButton;
