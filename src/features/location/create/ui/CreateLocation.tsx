import { MapPlusIcon } from 'lucide-react';

function CreateLocation() {
	return (
		<div className="relative w-full z-1 p-2">
			<MapPlusIcon />
			{/* <img src={} alt="eggbun" className="h-5 w-auto object-contain aspect-square" /> */}
			{/* <div className="flex flex-col gap-y-1 glass rounded-full w-full z-2">
				{items.map((item) => (
					<button key={item.image_url} type="button" className="flex items-center justify-center gap-x-2 w-6 h-6">
						<img src={item.image_url} alt="eggbun" className="h-5 w-auto object-contain aspect-square" />
					</button>
				))}
			</div> */}
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
