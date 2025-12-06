import SearchLocationBar from '@/features/location/fetch/ui/SearchLocationBar';
import ProductList from '@/features/product/item/ui/ProductList';

function LoggedInUserOnlyAsideBar() {
	return (
		<div className="absolute top-4 left-4 z-1 flex flex-col gap-y-2">
			<SearchLocationBar />
			<ProductList />
		</div>
	);
}

export default LoggedInUserOnlyAsideBar;
