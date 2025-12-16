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
	review: {
		all: ['review'],
		list: ['review', 'list'],
		byId: (reviewId: string) => ['review', 'byId', reviewId],
		byLocationId: (locationId: string) => ['review', 'byLocationId', locationId],
		images: {
			byReviewId: (reviewId: string) => ['review', 'images', 'byReviewId', reviewId],
			byLocationId: (locationId: string) => ['review', 'images', 'byLocationId', locationId],
		},
		products: {
			byReviewId: (reviewId: string) => ['review', 'products', 'byReviewId', reviewId],
			byLocationId: (locationId: string) => ['review', 'products', 'byLocationId', locationId],
		},
	},
	favorite: {
		all: ['favorite'],
		byLocationId: (locationId: string) => ['favorite', 'byLocationId', locationId],
	},
};
