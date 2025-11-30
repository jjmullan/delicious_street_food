import { Link } from 'react-router';

function AdditionalNoticeAtEdge({ text, linkText, link }: { text: string; linkText: string; link: string }) {
	return (
		<div className="flex justify-center gap-x-2 text-muted-foreground text-sm">
			<div>{text}</div>
			<Link to={`/${link}`} className="hover:underline text-black font-semibold">
				{linkText}
			</Link>
		</div>
	);
}

export default AdditionalNoticeAtEdge;
