import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            fullWidth = false,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className={cn('space-y-2', fullWidth && 'w-full')}>
                {/* Label */}
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-semibold text-gray-900"
                    >
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

                {/* Input Container */}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            'w-full px-4 py-3 bg-white border-2 rounded-xl text-base',
                            'transition-all duration-200',
                            'focus:outline-none focus:ring-4',
                            'disabled:opacity-50 disabled:cursor-not-allowed',
                            error
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                : 'border-gray-200 focus:border-[#3A7AFE] focus:ring-[#3A7AFE]/20',
                            leftIcon && 'pl-12',
                            rightIcon && 'pr-12',
                            className
                        )}
                        {...props}
                    />

                    {rightIcon && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            {rightIcon}
                        </div>
                    )}
                </div>

                {/* Helper Text or Error */}
                {(helperText || error) && (
                    <p
                        className={cn(
                            'text-sm',
                            error ? 'text-red-500' : 'text-gray-600'
                        )}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
