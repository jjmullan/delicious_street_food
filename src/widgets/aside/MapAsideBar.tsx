import { SearchLocationBar, SelectProductItem, useIsCreateMode } from '@features/location';
import { PenIcon } from 'lucide-react';
import { Activity, useState } from 'react';

function MapAsideBar() {
	const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
	const toggleSearchBar = () => {
		setIsSearchBarOpen((state) => !state);
	};

	// 위치 생성 모드 여부
	const isUpdateMode = useIsCreateMode();

	return (
		<div className="fixed top-0 full-width p-3 z-1 flex flex-col gap-y-2">
			<Activity mode={isSearchBarOpen && !isUpdateMode ? 'visible' : 'hidden'}>
				<SearchLocationBar />
			</Activity>
			<ul className="overflow-x-auto flex gap-x-1.5 snap-mandatory snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-11 items-center justify-start px-0.5">
				{/* 위치 생성 모드 진행 중 */}
				<Activity mode={isUpdateMode ? 'visible' : 'hidden'}>
					<div className="glass w-fit rounded-full flex items-center justify-center px-3 py-1.5 shrink-0 gap-x-1.5 border-2 border-brown-main text-xs align-text-bottom">
						<PenIcon width={14} />
						<p className="text-sm align-text-bottom">생성 모드</p>
					</div>
				</Activity>
				<Activity mode={isUpdateMode ? 'hidden' : 'visible'}>
					{/* AI 검색 버튼 */}
					<button
						type="button"
						onClick={toggleSearchBar}
						className={`glass w-fit border rounded-full flex items-center justify-center px-3 py-2 shrink-0 gap-x-1.5 ${isSearchBarOpen && 'border-2 border-brown-main'}`}
					>
						<svg
							width="120"
							height="126"
							viewBox="0 0 120 126"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="w-4 h-4"
						>
							<title>Search AI Icon</title>
							<path
								d="M120 117.646L111.642 126L94.9355 109.28L103.288 100.92L120 117.646ZM53.165 5.90332C54.7092 5.90701 56.253 5.97807 57.791 6.11621C55.7469 9.71962 54.3487 13.6541 53.6611 17.7402L53.165 17.7285C30.3218 17.7287 11.8145 36.2516 11.8145 59.1143C11.8145 81.977 30.3218 100.5 53.165 100.5C76.0084 100.5 94.5156 81.9771 94.5156 59.1143L94.498 58.6113C98.5811 57.9214 102.512 56.5216 106.112 54.4736C106.242 56.0106 106.331 57.5477 106.331 59.1143C106.331 88.4865 82.5123 112.325 53.165 112.325C23.8179 112.325 0 88.4864 0 59.1143C2.91292e-05 29.7421 23.8179 5.90347 53.165 5.90332ZM88.6084 0C89.2063 0 89.7912 0.179882 90.2861 0.515625C90.7808 0.851349 91.1633 1.32813 91.3848 1.88379L92.8857 5.49023C95.3934 11.6097 100.15 16.534 106.177 19.248L110.418 21.1396C110.96 21.3908 111.419 21.7921 111.741 22.2959C112.063 22.7998 112.234 23.3854 112.234 23.9834C112.234 24.5814 112.063 25.167 111.741 25.6709C111.419 26.1748 110.96 26.576 110.418 26.8271L105.929 28.8252C100.053 31.464 95.3783 36.2103 92.8262 42.1279L91.3672 45.4746C91.1401 46.0194 90.7574 46.4851 90.2666 46.8125C89.7757 47.1399 89.1983 47.3145 88.6084 47.3145C88.0186 47.3144 87.442 47.1398 86.9512 46.8125C86.4603 46.4851 86.0767 46.0195 85.8496 45.4746L84.3965 42.1338C81.8426 36.2119 77.1631 31.463 71.2822 28.8252L66.793 26.8271C66.2491 26.5767 65.7888 26.1754 65.4658 25.6709C65.1428 25.1663 64.9707 24.5797 64.9707 23.9805C64.9707 23.3813 65.1428 22.7946 65.4658 22.29C65.7888 21.7856 66.2492 21.3842 66.793 21.1338L71.0342 19.2422C77.0608 16.5321 81.8205 11.6123 84.332 5.49609L85.832 1.88379C86.0535 1.32802 86.4368 0.851361 86.9316 0.515625C87.4265 0.17993 88.0106 5.07547e-05 88.6084 0Z"
								fill="url(#paint0_linear_1465_13)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_1465_13"
									x1="124.843"
									y1="125.843"
									x2="21.3428"
									y2="17.3428"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#24C6DC" />
									<stop offset="1" stopColor="#514A9D" />
								</linearGradient>
							</defs>
						</svg>
						<p className="text-sm align-text-bottom">AI 검색</p>
					</button>
					{/* 카테고리 선택 버튼 */}
					<SelectProductItem />
				</Activity>
			</ul>
		</div>
	);
}

export default MapAsideBar;
