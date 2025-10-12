'use client';

import React, { useState } from 'react';
import { DynamicForm } from '@/components/DynamicForm';
import { FormData } from '@/lib/types';
import formSchema from './page-schema';

export default function HomePage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submissionResult, setSubmissionResult] = useState<string | null>(null);

	const handleFormSubmit = async (data: FormData) => {
		setIsSubmitting(true);
		setSubmissionResult(null);

		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 2000));
			console.log('checking');

			console.log('Form submitted with data:', data);
			setSubmissionResult('Form submitted successfully!');
		} catch (error) {
			console.error('Form submission error:', error);
			setSubmissionResult('Error submitting form. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="container mx-auto px-4">
				<div className="mb-8 text-center">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						Dynamic Form SDK Demo
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						This is a live demonstration of the Dynamic Form SDK. The form below
						is generated entirely from a JSON schema, with full validation,
						styling, and submission handling.
					</p>
				</div>

				{submissionResult && (
					<div
						className={`mb-6 p-4 rounded-md text-center ${
							submissionResult.includes('Error')
								? 'bg-red-100 text-red-700 border border-red-300'
								: 'bg-green-100 text-green-700 border border-green-300'
						}`}
					>
						{submissionResult}
					</div>
				)}

				<DynamicForm
					schema={formSchema}
					onSubmit={handleFormSubmit}
					isSubmitting={isSubmitting}
				/>
			</div>
		</div>
	);
}
