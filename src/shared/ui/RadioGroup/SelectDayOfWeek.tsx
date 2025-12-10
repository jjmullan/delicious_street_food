import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { useState } from 'react';

function SelectDayOfWeek() {
	// 요일 상태 관리
	const [visitDate, setVisitDate] = useState('');
	const handleChangeVisitDate = (value: string) => {
		setVisitDate(value);
	};

	return (
		<>
			{/* 요일 */}
			<div>
				<label htmlFor="visit_datetime" className="sr-only">
					방문 요일
				</label>
				<RadioGroup
					className="flex justify-evenly text-xs mt-1"
					id="visit_datetime"
					value={visitDate}
					onValueChange={handleChangeVisitDate}
				>
					<div className="flex flex-col items-center justify-center gap-y-1">
						<RadioGroupItem value="mon" id="mon" />
						<label htmlFor="mon" className="text-muted-foreground">
							월요일
						</label>
					</div>
					<div className="flex flex-col items-center gap-y-1">
						<RadioGroupItem value="tue" id="tue" />
						<label htmlFor="tue" className="text-muted-foreground">
							화요일
						</label>
					</div>
					<div className="flex flex-col items-center gap-y-1">
						<RadioGroupItem value="wed" id="wed" />
						<label htmlFor="wed" className="text-muted-foreground">
							수요일
						</label>
					</div>
					<div className="flex flex-col items-center gap-y-1">
						<RadioGroupItem value="thu" id="thu" />
						<label htmlFor="thu" className="text-muted-foreground">
							목요일
						</label>
					</div>
					<div className="flex flex-col items-center gap-y-1">
						<RadioGroupItem value="fri" id="fri" />
						<label htmlFor="fri" className="text-muted-foreground">
							금요일
						</label>
					</div>
					<div className="flex flex-col items-center gap-y-1">
						<RadioGroupItem value="sat" id="sat" />
						<label htmlFor="sat" className="text-muted-foreground">
							토요일
						</label>
					</div>
					<div className="flex flex-col items-center gap-y-1">
						<RadioGroupItem value="sun" id="sun" />
						<label htmlFor="sun" className="text-muted-foreground">
							일요일
						</label>
					</div>
				</RadioGroup>
			</div>
		</>
	);
}

export default SelectDayOfWeek;
