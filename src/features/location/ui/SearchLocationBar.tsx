import { Input } from '@shared/ui/shadcn/components/input';
import { XIcon } from 'lucide-react';
import { useState } from 'react';

function SearchLocationBar() {
	const [searchText, setSeartText] = useState('');

	return (
		<div className="relative auto-width top-0 h-fit">
			<label htmlFor="searchText" className="sr-only">
				Search
			</label>
			<Input
				id="searchText"
				type="text"
				value={searchText}
				onChange={(e) => setSeartText(e.target.value)}
				placeholder="예시: 서울시청 주변 붕어빵 맛집"
				className="flex justify-between items-center h-10 rounded-full text-md glass border-white/50 shadow-sm pl-4 pr-10"
			/>
			<button
				type="button"
				className="absolute top-3 right-4"
				onClick={() => {
					setSeartText('');
				}}
			>
				<XIcon className="w-4 h-4" />
			</button>
		</div>
	);
}

export default SearchLocationBar;
