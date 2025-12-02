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
};
