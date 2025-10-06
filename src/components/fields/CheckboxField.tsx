'use client';

import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { FormFieldProps } from '@/lib/types';
import { cn, applyInlineStyles } from '@/lib/utils';

export function CheckboxField({
	field,
	value,
	onChange,
	error,
	className,
}: FormFieldProps) {
	const labelStyles = applyInlineStyles(field.style.label);
	const inputStyles = applyInlineStyles(field.style.input);

	// Dynamic checkbox text based on field name
	const getCheckboxText = () => {
		if (field.label) return field.label;
		if (field.name === 'is_scene_member') return 'Are you a Scene+ ™ member?';
		if (field.name === 'is_contractor') return 'Are you a contractor?';
		return field.placeholder || 'Checkbox option';
	};

	return (
		<div className={cn('space-y-1', className)}>
			<div className="flex items-center space-x-3" style={inputStyles}>
				<Checkbox.Root
					id={field.id}
					checked={value || false}
					onCheckedChange={onChange}
					className={cn(
						'flex h-5 w-5 items-center justify-center flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
						error && 'focus:ring-red-500'
					)}
					style={{
						backgroundColor: value
							? inputStyles.borderColor || '#374151'
							: inputStyles.backgroundColor || '#ffffff',
						borderColor: inputStyles.borderColor || '#374151',
						borderWidth: inputStyles.borderWidth || '2px',
						borderRadius: inputStyles.borderRadius || '4px',
						borderStyle: 'solid',
						minWidth: '20px',
						minHeight: '20px',
					}}
				>
					<Checkbox.Indicator className="text-white">
						<CheckIcon className="h-4 w-4" />
					</Checkbox.Indicator>
				</Checkbox.Root>

				<label
					htmlFor={field.id}
					className="cursor-pointer flex-1 select-none"
					style={{
						...labelStyles,
						fontSize: labelStyles.fontSize || '14px',
						color: labelStyles.color || '#111827',
					}}
				>
					{getCheckboxText()}
					{field.required && <span className="text-red-500 ml-1">*</span>}
				</label>
			</div>

			{error && <p className="text-sm text-red-500 mt-1">{error}</p>}
		</div>
	);
}
