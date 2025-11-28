import React, { useState, useEffect } from 'react';
import {
    Search,
    Plus,
    MoreHorizontal,
    Shield,
    Mail,
    CheckCircle,
    XCircle,
    UserCog,
    Trash2,
    Lock,
    UserPlus,
    Filter,
    Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { supabase } from "@/integrations/supabase/client";

// Define User type based on our needs, combining profile and role
interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'moderator' | 'user';
    status: 'Active' | 'Inactive'; // We'll infer this or mock it for now
    lastActive: string; // We'll mock this or use updated_at
    avatar: string;
}

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');

    // Fetch users from Supabase
    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            // 1. Fetch Profiles
            const { data: profiles, error: profilesError } = await supabase
                .from('profiles')
                .select('*');

            if (profilesError) throw profilesError;

            // 2. Fetch User Roles
            const { data: roles, error: rolesError } = await supabase
                .from('user_roles')
                .select('*');

            if (rolesError) throw rolesError;

            // 3. Merge Data
            const mergedUsers: User[] = (profiles || []).map(profile => {
                const userRole = roles?.find(r => r.user_id === profile.id);
                return {
                    id: profile.id,
                    name: profile.full_name || 'Unknown User',
                    email: profile.email || '',
                    role: (userRole?.role as 'admin' | 'moderator' | 'user') || 'user',
                    status: 'Active', // Default to Active as we don't have a status col in profiles yet
                    lastActive: new Date(profile.updated_at || profile.created_at).toLocaleDateString(),
                    avatar: profile.avatar_url || ''
                };
            });

            setUsers(mergedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = selectedRole === 'all' || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        // NOTE: Actual email invitation requires Supabase Edge Functions or Admin API
        // For now, we'll simulate it
        toast.promise(new Promise(resolve => setTimeout(resolve, 1000)), {
            loading: 'Sending invitation...',
            success: `Invitation sent to ${newUser.email}`,
            error: 'Failed to send invitation'
        });
        setIsInviteModalOpen(false);
        setNewUser({ name: '', email: '', role: 'user' });
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to remove this user? This action cannot be undone.')) {
            try {
                // We can only delete from public tables. Auth user deletion requires admin API.
                const { error } = await supabase
                    .from('profiles')
                    .delete()
                    .eq('id', id);

                if (error) throw error;

                setUsers(users.filter(u => u.id !== id));
                toast.success("User removed from database");
            } catch (error) {
                console.error('Error deleting user:', error);
                toast.error('Failed to remove user');
            }
        }
    };

    const handleRoleUpdate = async (userId: string, newRole: 'admin' | 'moderator' | 'user') => {
        try {
            // Check if role entry exists
            const { data: existingRole } = await supabase
                .from('user_roles')
                .select('*')
                .eq('user_id', userId)
                .single();

            let error;
            if (existingRole) {
                const { error: updateError } = await supabase
                    .from('user_roles')
                    .update({ role: newRole })
                    .eq('user_id', userId);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('user_roles')
                    .insert([{ user_id: userId, role: newRole }]);
                error = insertError;
            }

            if (error) throw error;

            setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
            toast.success(`User role updated to ${newRole}`);
        } catch (error) {
            console.error('Error updating role:', error);
            toast.error('Failed to update user role');
        }
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'moderator': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'user': return 'bg-slate-50 text-slate-700 border-slate-200';
            default: return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Users & Roles</h1>
                    <p className="text-slate-500 mt-1">Manage team access and permissions.</p>
                </div>
                <Button className="bg-[#3A7AFE] hover:bg-[#1D4ED8] shadow-lg shadow-blue-500/25 gap-2 rounded-xl" onClick={() => setIsInviteModalOpen(true)}>
                    <UserPlus size={18} /> Invite User
                </Button>
            </div>

            {/* Users List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
                    <div className="relative flex-1 w-full max-w-md group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#3A7AFE] transition-colors" size={18} />
                        <Input
                            placeholder="Search users by name or email..."
                            className="pl-10 bg-white border-slate-200 focus:bg-white transition-all rounded-xl"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Select value={selectedRole} onValueChange={setSelectedRole}>
                            <SelectTrigger className="w-full sm:w-[150px] bg-white border-slate-200 rounded-xl">
                                <SelectValue placeholder="All Roles" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="moderator">Moderator</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-xs">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Last Active</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <Loader2 className="h-8 w-8 animate-spin text-[#3A7AFE]" />
                                            <p>Loading users...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No users found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="group hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                                    <AvatarImage src={user.avatar} />
                                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold text-slate-900 group-hover:text-[#3A7AFE] transition-colors">{user.name}</p>
                                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                                        <Mail size={10} /> {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className={cn("rounded-lg font-medium capitalize", getRoleBadgeColor(user.role))}>
                                                {user.role}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={cn("w-2 h-2 rounded-full", user.status === 'Active' ? "bg-emerald-500 animate-pulse" : "bg-slate-300")}></div>
                                                <span className={cn("font-medium", user.status === 'Active' ? 'text-emerald-700' : 'text-slate-500')}>
                                                    {user.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 font-medium">
                                            {user.lastActive}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                                                        <MoreHorizontal size={16} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => handleRoleUpdate(user.id, 'admin')}>
                                                        <Shield className="mr-2 h-4 w-4 text-purple-500" /> Make Admin
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleRoleUpdate(user.id, 'moderator')}>
                                                        <UserCog className="mr-2 h-4 w-4 text-blue-500" /> Make Moderator
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleRoleUpdate(user.id, 'user')}>
                                                        <UserCog className="mr-2 h-4 w-4 text-slate-500" /> Make User
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600 focus:text-red-700 focus:bg-red-50" onClick={() => handleDelete(user.id)}>
                                                        <Trash2 className="mr-2 h-4 w-4" /> Remove User
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Invite Modal */}
            <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Invite New User</DialogTitle>
                        <DialogDescription>
                            Send an invitation to a new team member to join the admin panel.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleInvite} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-slate-700 font-medium">Full Name</Label>
                            <Input
                                id="name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                required
                                placeholder="e.g. John Doe"
                                className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                required
                                placeholder="e.g. john@example.com"
                                className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-slate-700 font-medium">Role</Label>
                            <Select
                                value={newUser.role}
                                onValueChange={(val) => setNewUser({ ...newUser, role: val })}
                            >
                                <SelectTrigger className="bg-slate-50 border-slate-200 focus:bg-white transition-all">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="moderator">Moderator</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsInviteModalOpen(false)}>Cancel</Button>
                            <Button type="submit" className="bg-[#3A7AFE] hover:bg-[#1D4ED8] shadow-lg shadow-blue-500/25">Send Invitation</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserManagement;
