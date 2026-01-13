import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@shared/ui/shadcn/select';

function SelectCountry() {
	return (
		<Select value={''} onValueChange={() => {}}>
			<SelectTrigger>
				<SelectValue placeholder="지역" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>라벨</SelectLabel>
					<SelectItem value="">아이템</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

export default SelectCountry;
