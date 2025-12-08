export const QUERY_KEYS = {
	user: {
		all: ['user'],
		list: ['user', 'list'],
		byId: (userId: string) => ['user', 'byId', userId],
	},
	item: {
		all: ['item'],
		list: ['item', 'list'],
		byId: (itemId: string) => ['item', 'byId', itemId],
	},
	location: {
		all: ['location'],
		list: ['location', 'list'],
		byId: (locationId: string) => ['location', 'byId', locationId],
		byLatLng: (lat: string, lng: string) => ['location', 'byLatLng', lat, lng],
	},
};
