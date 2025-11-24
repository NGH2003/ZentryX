import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            fullWidth = false,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed';

        const variants = {
            primary: 'bg-gradient-to-r from-[#3A7AFE] to-[#1D4ED8] text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-[#3A7AFE]/30',
            secondary: 'bg-[#9333EA] text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-[#9333EA]/30',
            outline: 'border-2 border-[#3A7AFE] text-[#3A7AFE] hover:bg-[#3A7AFE] hover:text-white focus:ring-[#3A7AFE]/30',
            ghost: 'text-[#3A7AFE] hover:bg-[#3A7AFE]/10 focus:ring-[#3A7AFE]/30',
            gold: 'bg-[#F59E0B] text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-[#F59E0B]/30',
            danger: 'bg-[#EF4444] text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-[#EF4444]/30',
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm rounded-xl gap-2',
            md: 'px-6 py-3 text-base rounded-xl gap-2',
            lg: 'px-8 py-4 text-lg rounded-2xl gap-3',
            xl: 'px-12 py-6 text-xl rounded-2xl gap-3',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    fullWidth && 'w-full',
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
                )}
                {children}
                {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
