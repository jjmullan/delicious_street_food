import { CircleXIcon } from 'lucide-react';
import { items } from '@/features/product/item/libs/item';

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
						{items.map((item) => (
							<button key={item.image_url} type="button" className="flex items-center justify-center gap-x-2 w-6 h-6">
								<img src={item.image_url} alt="eggbun" className="h-5 w-auto object-contain aspect-square" />
							</button>
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
