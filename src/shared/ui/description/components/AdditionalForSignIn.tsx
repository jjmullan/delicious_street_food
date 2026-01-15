import type { AdditionalForSignInType } from '@shared/ui/description/types/description.type';
import { Link } from 'react-router';

export default function AdditionalForSignIn({ text, linkText, link }: AdditionalForSignInType) {
	return (
		<div className="flex justify-center gap-x-2 text-muted-foreground text-sm">
			<div>{text}</div>
			<Link to={`/${link}`} className="hover:underline text-black font-semibold">
				{linkText}
			</Link>
		</div>
	);
}
