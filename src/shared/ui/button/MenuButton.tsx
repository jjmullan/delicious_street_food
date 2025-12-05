import { MenuIcon } from 'lucide-react';

function MenuButton() {
	return (
		<button type="button" className="w-12 h-15 flex justify-center items-center">
			<MenuIcon width={24} />
		</button>
	);
}

export default MenuButton;
