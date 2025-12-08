import author from '@shared/assets/extra/author.svg';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCreateLocationModal } from '@/app/store/createLocationModalStore';
import { useSession } from '@/app/store/sessionStore';
import useCreateLocation from '@/features/location/create/hooks/useCreateLocation';
import { characterImages, items } from '@/features/product/item/libs/item';
import type { Item } from '@/features/product/item/types/item.type';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';
import Fallback from '@/shared/ui/fallback/Fallback';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/shared/ui/shadcn/alert-dialog';
import { Input } from '@/shared/ui/shadcn/input';

function CreateLocationModal() {
	// 선택된 위치 전역 상태 가져오기

	// 선택된 상품 카테고리 목록 관리
	const [products, setProducts] = useState<Item['name_en'][]>([]);
	const toggleChangeProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
		const productEnName = e.target.id as Item['name_en'];
		setProducts((prev) =>
			e.target.checked ? [...prev, productEnName] : prev.filter((products) => products !== productEnName)
		);
	};

	const session = useSession();
	const userId = session?.user.id;
	const { data: user } = useFecthUserData(userId);
	const nickname = user?.nickname;

	// 위치 생성 API 호출
	const { mutate: createLocation, isPending: isCreateLocationPending } = useCreateLocation({
		onSuccess: () => {
			toast.info('위치 등록이 성공했습니다.', { position: 'top-center' });
		},
		onError: (error) => {
			toast.error('위치 등록이 실패했습니다.', { position: 'top-center' });
			throw error;
		},
	});

	const store = useCreateLocationModal();
	if (!store.isOpen) return null;

	const handleActionClick = () => {
		// createLocation({
		// 	user_id: userId!,
		// 	latitude: clickedLocation?.lat,
		// 	longitude clickedLocation?.lng,
		// });

		if (store.onPositive) store.onPositive();
		store.actions.close();
	};
	const handleCancelClick = () => {
		if (store.onNegative) store.onNegative();
		store.actions.close();
	};

	// 로딩 상태 통합 관리
	const isPending = isCreateLocationPending;

	return (
		<AlertDialog open={store.isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>새로운 포장마차를 발견했어요!</AlertDialogTitle>
					<AlertDialogDescription className="sr-only">지도에 신규 포장마차를 등록해주세요</AlertDialogDescription>
					<div className="flex flex-col gap-y-5 mt-3">
						{/* 발견한 사람 */}
						<div className="text-sm flex flex-col gap-y-2 items-center">
							<img src={author} alt="author" width={64} />
							<p className="flex justify-center items-center gap-x-1">
								발견한 사람: <span className="text-brown-main font-medium">{nickname}</span>
							</p>
						</div>
						{/* 판매 중인 상품 */}
						<div className="flex flex-col gap-y-3 mb-2">
							<div className="flex gap-x-1">
								<div className="grid grid-rows-2 flex-1">
									<div className="border-b"></div>
									<div></div>
								</div>
								<h3 className="text-xs flex-1 text-muted-foreground font-medium">판매 중인 상품</h3>
								<div className="grid grid-rows-2 flex-1">
									<div className="border-b"></div>
									<div></div>
								</div>
							</div>
							<div className="flex justify-between">
								{items.map((item: Item) => (
									<div key={item.name_en} className="flex flex-col items-center gap-y-1.5 w-1/8">
										<label htmlFor={item.name_en} className="flex flex-col items-center justify-center gap-y-0.5">
											<div className="w-fit h-fit">
												<img
													src={characterImages[item.name_en]}
													alt={`${item.name_en}-${item.name_ko}`}
													className="h-6 aspect-square"
												/>
											</div>
											<p className="text-[10px] text-muted-foreground">{item.name_ko}</p>
										</label>
										<Input
											type="checkbox"
											name={`product_${item.name_en}`}
											id={item.name_en}
											className="w-3 h-3"
											onChange={toggleChangeProducts}
											disabled={isPending}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handleCancelClick} disabled={isPending}>
						취소
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleActionClick} disabled={isPending}>
						{isPending ? <Fallback title={'지도에 추가 중'} /> : '지도에 신규 포장마차 추가하기'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default CreateLocationModal;
