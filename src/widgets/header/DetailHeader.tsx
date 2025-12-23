import { ArrowLeftCircle, HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLocation } from '@/app/store/locationStore';

function DetailHeader({ title }: { title: string }) {
	const navigate = useNavigate();
	const location = useLocation();
	const handleGoBack = () => {
		navigate(-1);
	};
	const handleGoRootPage = () => {
		navigate(`/?lat=${location.lat}&lng=${location.lng}`);
	};
	return (
		<header className="fixed flex justify-between items-center text-sm full-width bg-[#fff] z-1">
			<button
				type="button"
				className="cursor-pointer px-4 h-12 flex justify-center items-center"
				onClick={handleGoBack}
			>
				<ArrowLeftCircle width={16} />
			</button>
			<h2 className="text-lg font-semibold">{title}</h2>
			<button
				type="button"
				className="cursor-pointer px-4 h-12 flex justify-center items-center"
				onClick={handleGoRootPage}
			>
				<HomeIcon width={16} />
			</button>
		</header>
	);
}

export default DetailHeader;
