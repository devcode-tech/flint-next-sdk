'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema, FormField as FormFieldType, FormData } from '@/lib/types';
import { createFormValidationSchema } from '@/lib/validation';
import { cn, applyInlineStyles } from '@/lib/utils';
import {
	TextField,
	EmailField,
	DateField,
	PostalField,
	FileField,
	CheckboxField,
	DropdownField,
	TermsField,
	RadioField,
	TextareaField,
	NumberField,
	TelephoneField,
	URLField,
	TimeField,
	ColorField,
	RangeField,
	SelectMultipleField,
} from '@/components/fields';

// Helper function to evaluate conditional logic
function evaluateCondition(
	condition: string,
	dependsOnValue: any,
	targetValue: any
): boolean {
	switch (condition) {
		case 'checked':
			return dependsOnValue === true || dependsOnValue === 'true';
		case 'unchecked':
			return (
				dependsOnValue === false ||
				dependsOnValue === 'false' ||
				!dependsOnValue
			);
		case 'equals':
			return dependsOnValue === targetValue;
		case 'notEquals':
			return dependsOnValue !== targetValue;
		case 'contains':
			return String(dependsOnValue || '').includes(String(targetValue));
		case 'greaterThan':
			return Number(dependsOnValue) > Number(targetValue);
		case 'lessThan':
			return Number(dependsOnValue) < Number(targetValue);
		default:
			return true;
	}
}

interface DynamicFormProps {
	schema: FormSchema;
	onSubmit: (data: FormData) => void | Promise<void>;
	isSubmitting?: boolean;
	className?: string;
}

function FormField({
	field,
	register,
	setValue,
	watch,
	errors,
	trigger,
	isSubmitted,
}: {
	field: FormFieldType;
	register: any;
	setValue: any;
	watch: any;
	errors: any;
	trigger: any;
	isSubmitted: boolean;
}) {
	const value = watch(field.name);
	const error = errors[field.name]?.message;

	// Register the field with React Hook Form
	React.useEffect(() => {
		register(field.name);
	}, [register, field.name]);

	const handleChange = (newValue: any) => {
		setValue(field.name, newValue, {
			shouldValidate: false,
			shouldDirty: true,
		});
		// Trigger validation on blur or after user stops typing
		if (isSubmitted) {
			// If form was already submitted, show immediate validation feedback
			setTimeout(() => {
				trigger(field.name);
			}, 300);
		}
	};

	const handleBlur = () => {
		// Always validate on blur to show custom error messages
		trigger(field.name);
	};

	const fieldProps = {
		field,
		value,
		onChange: handleChange,
		onBlur: handleBlur,
		error,
		className: '',
	};

	switch (field.type) {
		case 'text':
			return <TextField {...fieldProps} />;
		case 'email':
			return <EmailField {...fieldProps} />;
		case 'date':
			return <DateField {...fieldProps} />;
		case 'postal':
			return <PostalField {...fieldProps} />;
		case 'file':
			return <FileField {...fieldProps} />;
		case 'checkbox':
			return <CheckboxField {...fieldProps} />;
		case 'dropdown':
			return <DropdownField {...fieldProps} />;
		case 'terms':
			return <TermsField {...fieldProps} />;
		case 'radio':
			return <RadioField {...fieldProps} />;
		case 'textarea':
			return <TextareaField {...fieldProps} />;
		case 'number':
			return <NumberField {...fieldProps} />;
		case 'telephone':
			return <TelephoneField {...fieldProps} />;
		case 'url':
			return <URLField {...fieldProps} />;
		case 'time':
			return <TimeField {...fieldProps} />;
		case 'color':
			return <ColorField {...fieldProps} />;
		case 'range':
			return <RangeField {...fieldProps} />;
		case 'select-multiple':
			return <SelectMultipleField {...fieldProps} />;
		default:
			return <TextField {...fieldProps} />;
	}
}

export function DynamicForm({
	schema,
	onSubmit,
	isSubmitting = false,
	className,
}: DynamicFormProps) {
	const validationSchema = createFormValidationSchema(schema);

	// Effect to load custom font
	React.useEffect(() => {
		if (
			schema.design['font-link'] &&
			schema.design['font-family'] === 'custom'
		) {
			const existingLink = document.querySelector(
				`link[href="${schema.design['font-link']}"]`
			);
			if (!existingLink) {
				const link = document.createElement('link');
				link.href = schema.design['font-link'];
				link.rel = 'stylesheet';
				document.head.appendChild(link);
			}
		}
	}, [schema.design['font-link'], schema.design['font-family']]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitted },
		setValue,
		watch,
		trigger,
	} = useForm({
		resolver: zodResolver(validationSchema),
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		shouldFocusError: true,
	});
	// Watch all form values for conditional logic evaluation
	const formValues = watch();

	// Filter fields based on conditional logic
	const visibleFields = React.useMemo(() => {
		return schema.fields.filter(field => {
			if (!field.conditionalLogic) {
				return true; // No conditional logic, always visible
			}

			const { dependsOn, condition, value } = field.conditionalLogic;

			// Find the field this depends on
			const dependsOnField = schema.fields.find(f => f.id === dependsOn);
			if (!dependsOnField) {
				return true; // If dependency field not found, show the field
			}

			// Get the value of the dependency field
			const dependsOnValue = formValues[dependsOnField.name];

			// Evaluate the condition
			return evaluateCondition(condition, dependsOnValue, value);
		});
	}, [schema.fields, formValues]);

	const containerStyles = applyInlineStyles({
		'background-color': schema.design['background-color'],
		'font-family':
			schema.design['font-family'] === 'custom'
				? 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
				: schema.design['font-family'],
		padding: undefined, // Let Tailwind handle padding
		'border-radius': undefined, // Let Tailwind handle border-radius
		'box-shadow': undefined, // Let Tailwind handle box-shadow
	});

	const handleFormSubmit = async (data: FormData) => {
		try {
			await onSubmit(data);
		} catch (error) {
			console.error('❌ Error in form submission:', error);
		}
	};

	const handleButtonClick = (e: React.MouseEvent) => {
		console.log('🔘 Submit button clicked!');
		console.log('🔘 Current form values:', watch());
		console.log('🔘 Current errors:', errors);
	};

	const submitButtonStyles = applyInlineStyles({
		'background-color': schema.design['submit-button']['background-color'],
		color: schema.design['submit-button']['text-color'],
		padding: schema.design['submit-button'].padding,
		'border-radius': schema.design['submit-button']['border-radius'],
		'font-size': schema.design['submit-button']['font-size'],
		'font-weight': schema.design['submit-button']['font-weight'],
	});

	const getSubmitButtonAlignment = () => {
		switch (schema.design['submit-button'].alignment) {
			case 'left':
				return 'justify-start';
			case 'right':
				return 'justify-end';
			case 'center':
			default:
				return 'justify-center';
		}
	};

	return (
		<div className={cn('w-full', className)}>
			<form
				onSubmit={e => {
					handleSubmit(
						data => {
							console.log('✅ Validation passed! Calling handleFormSubmit');
							return handleFormSubmit(data);
						},
						errors => {
							console.log('❌ Validation failed with errors:', errors);
						}
					)(e);
				}}
				className={cn(
					schema.design.padding,
					schema.design['max-width'],
					schema.design['border-radius'],
					schema.design['box-shadow'],
					'mx-auto',
					schema.design.spacing.container
				)}
				style={containerStyles}
			>
				{/* Form Title */}
				{schema.title && (
					<div className="mb-8 text-center">
						<h1 className="text-3xl font-bold text-gray-900">{schema.title}</h1>
						{schema.description && (
							<p className="mt-2 text-gray-600">{schema.description}</p>
						)}
					</div>
				)}

				{/* Logo */}
				{schema.design['logo-url'] && (
					<div className="mb-8 text-center">
						<img
							src={schema.design['logo-url']}
							alt="Logo"
							className="mx-auto max-h-20"
						/>
					</div>
				)}

				{/* Form Fields */}
				<div className="flex flex-wrap -mx-2">
					{visibleFields.map(field => {
						// Skip fields without names (like text-only terms)
						if (!field.name || !field.name.trim()) {
							return (
								<div key={field.id} className={cn(field.width, 'px-2 mb-6')}>
									<TermsField
										field={field}
										value={undefined}
										onChange={() => {}}
										className=""
									/>
								</div>
							);
						}

						return (
							<div key={field.id} className={cn(field.width, 'px-2 mb-6')}>
								<FormField
									field={field}
									register={register}
									setValue={setValue}
									watch={watch}
									errors={errors}
									trigger={trigger}
									isSubmitted={isSubmitted}
								/>
							</div>
						);
					})}
				</div>

				{/* Submit Button */}
				<div className={cn('flex mt-8', getSubmitButtonAlignment())}>
					<button
						type="submit"
						disabled={isSubmitting}
						onClick={handleButtonClick}
						className={cn(
							'px-8 py-3 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
							schema.design['submit-button'].width === 'auto'
								? 'w-auto'
								: 'w-full'
						)}
						style={submitButtonStyles}
					>
						{isSubmitting
							? 'Submitting...'
							: schema.design['submit-button'].text}
					</button>
				</div>
			</form>
		</div>
	);
}
