import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertCircle, Clock, MinusCircle } from 'lucide-react';

export type StatusType = 'active' | 'inactive' | 'pending' | 'error' | 'warning' | 'success' | 'draft' | 'published';

interface StatusBadgeProps {
    status: string;
    type?: StatusType; // Optional override if status string doesn't match standard types
    showIcon?: boolean;
    className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
    status,
    type,
    showIcon = true,
    className
}) => {
    const normalizedStatus = (type || status).toLowerCase();

    let variantStyles = "bg-slate-100 text-slate-600 border-slate-200";
    let Icon = MinusCircle;

    if (['active', 'success', 'published', 'resolved'].includes(normalizedStatus)) {
        variantStyles = "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
        Icon = CheckCircle;
    } else if (['inactive', 'error', 'deleted', 'banned'].includes(normalizedStatus)) {
        variantStyles = "bg-red-50 text-red-700 border-red-200 hover:bg-red-100";
        Icon = XCircle;
    } else if (['pending', 'processing', 'in progress'].includes(normalizedStatus)) {
        variantStyles = "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
        Icon = Clock;
    } else if (['warning', 'draft', 'hidden'].includes(normalizedStatus)) {
        variantStyles = "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
        Icon = AlertCircle;
    }

    return (
        <Badge variant="outline" className={cn("gap-1.5 py-1 pr-2.5 font-medium capitalize", variantStyles, className)}>
            {showIcon && <Icon size={12} className="shrink-0" />}
            {status}
        </Badge>
    );
};
