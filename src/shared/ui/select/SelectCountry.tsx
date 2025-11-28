import { DOMESTIC, OVERSEAS } from '@/shared/lib/country';
import type { SelectCountryProps } from '@/shared/types/types';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/shadcn/select';

function SelectCountry({ location, value, onValueChange }: SelectCountryProps) {
	return (
		<Select value={value} onValueChange={onValueChange}>
			<SelectTrigger>
				<SelectValue placeholder="지역" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>{location}</SelectLabel>
					{DOMESTIC.map((country) => (
						<SelectItem key={country.shortenName} value={country.shortenName}>
							{country.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

export default SelectCountry;
