import { EditIcon, Trash2Icon } from 'lucide-react';

function ReviewEditAndDeleteButton() {
	return (
		<div className="flex gap-x-2">
			<div className="flex items-center text-xs gap-x-1">
				<EditIcon width={10} height={10} />
				<p>수정</p>
			</div>
			<div className="flex items-center text-xs gap-x-1 ">
				<Trash2Icon width={10} height={10} />
				<p>삭제</p>
			</div>
		</div>
	);
}

export default ReviewEditAndDeleteButton;
