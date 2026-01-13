import { CalendarDaysIcon } from 'lucide-react';

function ReviewVisitDate({ visitDatetime }: { visitDatetime: string }) {
	return (
		<div className="flex items-center gap-x-1">
			<CalendarDaysIcon width={14} />
			<p className="">{visitDatetime}</p>
		</div>
	);
}

export default ReviewVisitDate;
