export const QUERY_KEYS = {
	user: {
		all: ['user'],
		list: ['user', 'list'],
		byId: (userId: string) => ['user', 'byId', userId],
	},
};
