import { LoaderCircleIcon } from 'lucide-react';

function FallbackText({ title }: { title: string }) {
	return (
		<>
			<LoaderCircleIcon className="animate-spin" />
			<p className="text-white">{title}</p>
		</>
	);
}

export default FallbackText;
