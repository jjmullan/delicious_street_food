import { ArrowLeft } from 'lucide-react';
import { Activity } from 'react';
import { useNavigate } from 'react-router';

function UnloggedInHeader() {
	const navigate = useNavigate();

	return (
		<header className="flex justify-start items-center px-4 h-12 text-lg w-full max-w-[768px] md:border-x mx-auto">
			<Activity mode={window.location.href.split('/login').pop() === '' ? 'hidden' : 'visible'}>
				<button type="button" onClick={() => navigate(-1)}>
					<ArrowLeft />
				</button>
			</Activity>
		</header>
	);
}

export default UnloggedInHeader;
