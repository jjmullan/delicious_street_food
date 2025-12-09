import { XIcon } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/shared/ui/shadcn/input';

function SearchLocationBar() {
	const [searchText, setSeartText] = useState('');

	return (
		<div className="relative w-[calc(100vw-32px)] max-w-[calc(768px-32px)] min-w-[calc(320px-32px)] top-0 h-fit">
			<label htmlFor="searchText" className="sr-only">
				Search
			</label>
			<Input
				id="searchText"
				type="text"
				value={searchText}
				onChange={(e) => setSeartText(e.target.value)}
				placeholder="검색어를 입력하세요"
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
