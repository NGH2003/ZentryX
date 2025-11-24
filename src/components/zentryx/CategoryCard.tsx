import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CategoryCardProps {
    name: string;
    description: string;
    icon: LucideIcon;
    toolCount: number;
    gradient: string;
    href: string;
    className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    name,
    description,
    icon: Icon,
    toolCount,
    gradient,
    href,
    className,
}) => {
    return (
        <Link to={href} className="block group">
            <div
                className={cn(
                    'relative overflow-hidden bg-white rounded-2xl border-2 border-gray-200',
                    'hover:border-[#3A7AFE] hover:shadow-zentryx-lg',
                    'transition-all duration-300 hover:-translate-y-2',
                    'p-6 h-full',
                    className
                )}
            >
                {/* Icon Container */}
                <div
                    className={cn(
                        'w-16 h-16 rounded-2xl flex items-center justify-center mb-4',
                        'bg-gradient-to-br',
                        gradient,
                        'group-hover:scale-110 transition-transform duration-300'
                    )}
                >
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#3A7AFE] transition-colors">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500">
                        {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
                    </span>
                    <svg
                        className="w-5 h-5 text-[#3A7AFE] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 transition-all duration-300 pointer-events-none rounded-2xl" />
            </div>
        </Link>
    );
};

export default CategoryCard;
