import { XCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/shared/ui/shadcn/input';

function SearchLocationBar() {
	const [searchText, setSeartText] = useState('');

	return (
		<>
			<Input
				type="text"
				value={searchText}
				onChange={(e) => setSeartText(e.target.value)}
				placeholder="검색어를 입력하세요"
				className="flex justify-between items-center h-12 rounded-full absolute top-4 text-md w-[calc(100vw-32px)] max-w-[calc(768px-32px)] min-w-[calc(320px-32px)] left-4 z-1 pl-4 pr-10 glass border-white/50 shadow-sm"
			/>
			<button type="button" className="absolute z-1 top-8 right-8" onClick={() => setSeartText('')}>
				<XCircleIcon className="w-4 h-4" />
			</button>
		</>
	);
}

export default SearchLocationBar;
