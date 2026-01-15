export type Validate = {
	errors: {
		email?: string;
		password?: string;
		passwordConfirm?: string;
	};
	data?: {
		email?: string;
		password?: string;
		passwordConfirm?: string;
	};
	isValid: boolean;
};
