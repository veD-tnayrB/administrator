export interface ITexts {
	preTitle: string;
	title: string;
	submit: string;
	success: string;
	cancel: string;
	validations: {
		isMoreOrEqualToEightCharacters: string;
		hasOneUppercaseLetter: string;
		hasOneLowercaseLetter: string;
		isBothPasswordEqual: string;
	};
	fields: {
		newPassword: string;
		confirmPassword: string;
	};
	errors: {
		passwordMismatch: string;
		passwordTooShort: string;
		somethingWentWrong: string;
	};
}
