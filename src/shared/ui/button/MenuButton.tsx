import { MenuIcon } from 'lucide-react';

function MenuButton() {
	return (
		<button type="button" className="w-20 flex justify-start">
			<MenuIcon width={16} />
		</button>
	);
}

export default MenuButton;
