import { LoaderCircleIcon } from 'lucide-react';

function Fallback({ title }: { title: string }) {
	return (
		<>
			<LoaderCircleIcon className="animate-spin" />
			<p className="text-white">{title}</p>
		</>
	);
}

export default Fallback;
