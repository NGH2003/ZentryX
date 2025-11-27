import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';

export interface ToolCardProps {
    name: string;
    description?: string;
    icon: string;
    category: string;
    badge?: 'new' | 'updated' | 'trending' | 'beta' | 'deprecated' | null;
    href: string;
    featured?: boolean;
    className?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
    name,
    description,
    icon,
    category,
    badge,
    href,
    featured = false,
    className,
}) => {
    const badgeStyles = {
        new: 'badge-new',
        updated: 'badge-updated',
        trending: 'badge-trending',
        beta: 'bg-orange-100 text-orange-800 px-2 py-1 rounded-full',
        deprecated: 'bg-red-100 text-red-800 px-2 py-1 rounded-full',
    };

    return (
        <Link to={href} className="block group h-full">
            <div
                className={cn(
                    'relative overflow-hidden rounded-2xl border-2 h-full',
                    'transition-all duration-300',
                    featured
                        ? 'bg-gradient-to-br from-white to-blue-50 border-transparent hover:border-[#3A7AFE] shadow-md hover:shadow-zentryx-lg'
                        : 'bg-white border-gray-200 hover:border-[#3A7AFE] shadow-sm hover:shadow-lg',
                    'hover:-translate-y-2',
                    className
                )}
            >
                <div className="p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div
                            className={cn(
                                'text-5xl transition-all duration-300',
                                'group-hover:scale-110 group-hover:rotate-6'
                            )}
                        >
                            {icon}
                        </div>
                        {badge && (
                            <span className={cn('text-xs font-bold', badgeStyles[badge])}>
                                {badge}
                            </span>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2 mb-4">
                        <h3
                            className={cn(
                                'text-lg font-bold text-gray-900',
                                'group-hover:text-[#3A7AFE] transition-colors',
                                featured && 'text-xl'
                            )}
                        >
                            {name}
                        </h3>
                        {description && (
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                {description}
                            </p>
                        )}
                        <p className="text-sm text-gray-500">{category}</p>
                    </div>

                    {/* CTA Button */}
                    <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                        className="mt-auto"
                    >
                        Try Now
                    </Button>
                </div>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 transition-all duration-300 pointer-events-none rounded-2xl" />
            </div>
        </Link>
    );
};

export default ToolCard;
