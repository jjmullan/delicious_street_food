import { Button } from '@/shared/ui/shadcn/button';

function PrevNextButton({ page }: { page: number }) {
	return (
		<>
			{page === 1 ? (
				<Button
					type="button"
					className="fixed bottom-3 auto-width"
					disabled={pageOneDisabled}
					onClick={handleClickNextPage}
				>
					{`다음 페이지 (${page + 1}/3)`}
				</Button>
			) : page === 2 ? (
				<div className="fixed bottom-3 auto-width flex flex-col gap-y-2">
					<Button type="button" className="bg-muted text-balck" onClick={handleClickPrevPage}>
						{`이전 페이지 (${page - 1}/3)`}
					</Button>
					<Button type="button" className="flex-1" disabled={pageTwoDisabled} onClick={handleClickNextPage}>
						{`다음 페이지 (${page + 1}/3)`}
					</Button>
				</div>
			) : (
				<div className="fixed bottom-3 auto-width flex flex-col gap-y-2">
					<Button type="button" className="bg-muted text-balck" onClick={handleClickPrevPage}>
						{`이전 페이지 (${page - 1}/3)`}
					</Button>
					<Button type="button" className="flex-1" disabled={pageThreeDisabled}>
						작성 완료
					</Button>
				</div>
			)}
		</>
	);
}

export default PrevNextButton;
