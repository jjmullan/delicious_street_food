import { PopoverClose } from '@radix-ui/react-popover';
import { EditIcon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn/popover';

function EditDeleteButton({ onDelete }: { onDelete(): void }) {
	return (
		<Popover>
			<PopoverTrigger>
				<MoreVerticalIcon width={16} height={16} />
			</PopoverTrigger>
			<PopoverContent className="flex w-fit flex-col justify-center items-center text-sm p-0">
				<PopoverClose asChild>
					<button type="button" className="flex justify-center items-center gap-x-1 p-3 pb-1.5">
						<EditIcon width={12} height={12} />
						<p className="text-xs">수정</p>
					</button>
				</PopoverClose>
				<PopoverClose asChild>
					<button type="button" className="flex justify-center items-center gap-x-1 p-3 pt-1.5" onClick={onDelete}>
						<Trash2Icon width={12} height={12} />
						<p className="text-xs">삭제</p>
					</button>
				</PopoverClose>
			</PopoverContent>
		</Popover>
	);
}

export default EditDeleteButton;
