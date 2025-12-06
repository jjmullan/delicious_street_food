import { CircleXIcon } from 'lucide-react';
import { items } from '@/features/product/item/libs/item';
import type { Item } from '@/features/product/item/types/item.type';
import ProductItemForCreate from '@/features/product/item/ui/ProductItemForCreate';

function CreateLocation() {
	return (
		<div className="relative">
			{/* <LocationFinder bgColorCode="1" /> */}
			<div className="absolute translate-[-16px] glass rounded-full w-fit z-2 p-0.5">
				<div className="flex flex-col items-center gap-y-0.5">
					<button type="button" className="w-6 h-6 flex items-center justify-center border-b">
						<CircleXIcon className="w-4 h-4" />
					</button>
					<div className="flex flex-col items-center gap-y-1">
						{items.map((item: Item) => (
							<ProductItemForCreate key={item.name_en} {...item} />
						))}
					</div>
				</div>
			</div>

			{/* <div className="absolute top-8">
				<Activity mode={isModalOpen ? 'visible' : 'hidden'}>
					<div className="glass w-40">
						<p>위치 추가하기</p>
					</div>
				</Activity>
			</div> */}
		</div>
	);
}

export default CreateLocation;
