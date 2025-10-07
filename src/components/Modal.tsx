'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
	children: React.ReactNode;
	onClose: () => void;
	className?: string;
}

export function Modal({ children, onClose, className }: ModalProps) {
	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handleClose();
			}
		};
		window.addEventListener('keydown', handleEsc);
		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, []);

	const handleClose = () => {
		setIsOpen(false);
		setTimeout(onClose, 300); // Allow for closing animation
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div
			className={cn(
				'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300',
				isOpen ? 'opacity-100' : 'opacity-0',
				className
			)}
			onClick={handleClose}
		>
			<div
				className={cn(
					'relative w-full max-w-2xl transform rounded-lg bg-white p-6 shadow-xl transition-transform duration-300 max-h-[90vh] overflow-y-auto',
					isOpen ? 'scale-100' : 'scale-95'
				)}
				onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
			>
				{children}
				<button
					onClick={handleClose}
					className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
					aria-label="Close modal"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
