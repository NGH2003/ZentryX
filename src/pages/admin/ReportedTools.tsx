import React, { useState, useEffect } from 'react';
import {
    AlertTriangle,
    CheckCircle,
    Clock,
    Filter,
    MoreHorizontal,
    Search,
    Trash2,
    ExternalLink,
    MessageSquare,
    Bug,
    FileText,
    Layout,
    Check,
    Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { supabase } from "@/integrations/supabase/client";

interface Report {
    id: number;
    tool_id: number;
    toolName?: string; // Joined from tools table
    issue_type: string;
    severity: string;
    description: string;
    reporter_email: string;
    status: string;
    created_at: string;
    tools?: { name: string }; // Supabase join result
}

const ReportedTools = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        setIsLoading(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data, error } = await (supabase as any)
                .from('reports')
                .select('*, tools(name)')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data) {
                const formattedReports = data.map((r: any) => ({
                    ...r,
                    toolName: r.tools?.name || 'Unknown Tool',
                    date: new Date(r.created_at).toLocaleDateString()
                }));
                setReports(formattedReports);
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
            toast.error('Failed to load reports');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredReports = reports.filter(report => {
        const matchesStatus = filterStatus === 'All' ? true : report.status === filterStatus;
        const matchesSearch = (report.toolName?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
            report.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleStatusChange = async (id: number, newStatus: string) => {
        // Optimistic update
        setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error } = await (supabase as any)
                .from('reports')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;
            toast.success(`Report #${id} marked as ${newStatus}`);
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
            fetchReports(); // Revert on error
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Delete this report?')) {
            // Optimistic update
            setReports(prev => prev.filter(r => r.id !== id));

            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { error } = await (supabase as any)
                    .from('reports')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                toast.success("Report deleted");
            } catch (error) {
                console.error('Error deleting report:', error);
                toast.error('Failed to delete report');
                fetchReports(); // Revert
            }
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity?.toLowerCase()) {
            case 'critical': return 'bg-red-50 text-red-700 border-red-200';
            case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
            case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'open': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'in progress': return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    const getIssueIcon = (type: string) => {
        switch (type?.toLowerCase()) {
            case 'bug': return <Bug size={16} className="text-red-500" />;
            case 'content': return <FileText size={16} className="text-blue-500" />;
            case 'ui/ux': return <Layout size={16} className="text-purple-500" />;
            default: return <AlertTriangle size={16} className="text-slate-500" />;
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reported Tools</h1>
                    <p className="text-slate-500 mt-1">Track and resolve issues reported by users.</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center gap-3 px-5 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-sm font-medium text-slate-600">Open Issues</span>
                        </div>
                        <div className="h-4 w-px bg-slate-200"></div>
                        <span className="text-xl font-bold text-slate-900">{reports.filter(r => r.status === 'Open').length}</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
                <div className="relative flex-1 w-full max-w-md group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3A7AFE] transition-colors" size={18} />
                    <Input
                        placeholder="Search reports by tool name or description..."
                        className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                    {['All', 'Open', 'In Progress', 'Resolved'].map((status) => (
                        <Button
                            key={status}
                            variant={filterStatus === status ? 'default' : 'outline'}
                            onClick={() => setFilterStatus(status)}
                            className={cn(
                                "whitespace-nowrap rounded-xl border-slate-200",
                                filterStatus === status
                                    ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md"
                                    : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            {status}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Reports List */}
            <div className="grid gap-4">
                {filteredReports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 text-center">
                        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="h-8 w-8 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">All Caught Up!</h3>
                        <p className="text-slate-500 mt-1 max-w-xs mx-auto">No reports found matching your current filters. Great job!</p>
                        {filterStatus !== 'All' && (
                            <Button variant="link" onClick={() => setFilterStatus('All')} className="mt-2 text-[#3A7AFE]">
                                Clear filters
                            </Button>
                        )}
                    </div>
                ) : (
                    filteredReports.map((report) => (
                        <div key={report.id} className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col lg:flex-row gap-6 relative overflow-hidden">
                            {/* Status Indicator Strip */}
                            <div className={cn(
                                "absolute left-0 top-0 bottom-0 w-1",
                                report.status === 'Open' ? "bg-red-500" :
                                    report.status === 'Resolved' ? "bg-emerald-500" : "bg-purple-500"
                            )}></div>

                            {/* Left: Icon & Status */}
                            <div className="flex flex-col items-start gap-3 min-w-[140px]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                                        {getIssueIcon(report.issue_type)}
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Report #{report.id}</p>
                                        <p className="text-sm font-semibold text-slate-900">{new Date(report.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className={cn("capitalize px-2.5 py-1 rounded-lg font-medium", getStatusColor(report.status))}>
                                    {report.status === 'Resolved' && <Check size={12} className="mr-1" />}
                                    {report.status}
                                </Badge>
                            </div>

                            {/* Middle: Content */}
                            <div className="flex-1 space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#3A7AFE] transition-colors">
                                        {report.toolName}
                                    </h3>
                                    <div className="flex gap-2">
                                        <Badge variant="outline" className={cn("capitalize rounded-lg", getSeverityColor(report.severity))}>
                                            {report.severity} Priority
                                        </Badge>
                                        <Badge variant="outline" className="text-slate-500 bg-slate-50 border-slate-200 rounded-lg">
                                            {report.issue_type}
                                        </Badge>
                                    </div>
                                </div>

                                <p className="text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100 text-sm">
                                    {report.description}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-slate-500 pt-1">
                                    <span className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-lg border border-slate-100">
                                        <MessageSquare size={14} className="text-slate-400" />
                                        Reported by: <span className="font-medium text-slate-700">{report.reporter_email}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex lg:flex-col items-center justify-center gap-2 lg:border-l border-slate-100 lg:pl-6 pt-4 lg:pt-0 border-t lg:border-t-0 mt-2 lg:mt-0">
                                <Button variant="outline" size="sm" className="w-full gap-2 bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm">
                                    <ExternalLink size={14} /> View Tool
                                </Button>

                                {report.status !== 'Resolved' && (
                                    <Button
                                        size="sm"
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2 shadow-lg shadow-emerald-500/20"
                                        onClick={() => handleStatusChange(report.id, 'Resolved')}
                                    >
                                        <CheckCircle size={14} /> Resolve
                                    </Button>
                                )}

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="w-full text-slate-400 hover:text-slate-600">
                                            <MoreHorizontal size={16} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => handleStatusChange(report.id, 'In Progress')}>
                                            Mark In Progress
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleStatusChange(report.id, 'Open')}>
                                            Re-open Issue
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600 focus:text-red-700 focus:bg-red-50" onClick={() => handleDelete(report.id)}>
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete Report
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReportedTools;
