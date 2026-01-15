import type { PrevNextButtonType } from '@shared/ui/button/types/button.type';
import { Button } from '@shared/ui/shadcn/components/button';

export default function PrevNextButton({ disabled, onClick, mode, title }: PrevNextButtonType) {
	return (
		<Button type="button" className={mode === 'sub' ? 'bg-muted text-black' : ''} disabled={disabled} onClick={onClick}>
			{title}
		</Button>
	);
}
