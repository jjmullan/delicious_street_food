export const regEmail = /^[a-zA-Z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
export const regPassword = {
	minLength: /.{8,}/,
	hasLowerCase: /[a-z]/,
	hasUpperCase: /[A-Z]/,
	hasDigit: /\d/,
	hasSymbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
};
