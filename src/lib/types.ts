// Core type definitions for the Dynamic Form SDK

export interface FormFieldStyle {
	label?: {
		color?: string;
		'font-weight'?: string;
		'font-size'?: string;
		'text-align'?: 'left' | 'center' | 'right';
		'margin-bottom'?: string;
	};
	input?: {
		'background-color'?: string;
		'border-color'?: string;
		'border-radius'?: string;
		'border-width'?: string;
		padding?: string;
		'font-size'?: string;
		height?: string;
		color?: string;
	};
}

export interface FormFieldValidation {
	requiredMessage?: string;
	emailMessage?: string;
	dateFormat?: string;
	dateFormatMessage?: string;
	minAge?: number;
	minAgeMessage?: string;
	maxDate?: string;
	postalFormat?: string;
	maxFileSize?: number;
	fileTypes?: string[];
	fileSizeMessage?: string;
	fileTypeMessage?: string;
}

export interface FormFieldOption {
	id: string;
	label: string;
	value: string;
}

export interface FormFieldLink {
	id: string;
	text: string;
	url: string;
}

export type FormFieldType =
	| 'text'
	| 'email'
	| 'date'
	| 'postal'
	| 'file'
	| 'checkbox'
	| 'dropdown'
	| 'terms'
	| 'radio'
	| 'textarea'
	| 'number'
	| 'telephone'
	| 'url'
	| 'time'
	| 'color'
	| 'range'
	| 'select-multiple';

export interface ConditionalLogic {
	dependsOn: string;
	condition:
		| 'checked'
		| 'unchecked'
		| 'equals'
		| 'notEquals'
		| 'contains'
		| 'greaterThan'
		| 'lessThan';
	value?: any;
}

export interface FormField {
	id: string;
	type: FormFieldType;
	name: string;
	label: string;
	placeholder?: string;
	required?: boolean;
	validation?: FormFieldValidation;
	options?: Array<{ label: string; value: string; id: string }>;
	style?: FormFieldStyle;
	width?: 'w-full' | 'w-1/2' | 'w-1/3' | 'w-2/3';
	checkboxText?: string;
	checkboxAlignment?: 'left' | 'right';
	conditionalLogic?: ConditionalLogic;
	dateFormat?: string;
	mode?: string;
	content?: string;
	links?: any;
}

export interface FormSubmitButton {
	text: string;
	'background-color': string;
	'text-color': string;
	padding: string;
	'border-radius': string;
	'font-size': string;
	'font-weight': string;
	width: string;
	alignment: 'left' | 'center' | 'right';
}

export interface FormDesign {
	'background-color': string;
	'font-family': string;
	'font-size': string;
	padding: string;
	'max-width': string;
	'border-radius': string;
	'box-shadow': string;
	'logo-url': string;
	'submit-button': FormSubmitButton;
	spacing: {
		container: string;
		fields: string;
	};
	'font-link': string;
}

export interface FormSchema {
	id: string;
	name: string;
	title: string;
	description: string;
	fields: FormField[];
	design: FormDesign;
}

export type FormData = Record<string, any>;

export interface FormFieldProps {
	field: FormField;
	value: any;
	onChange: (value: any) => void;
	onBlur?: () => void;
	error?: string;
	className?: string;
}
