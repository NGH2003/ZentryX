import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface BlogEditDialogProps {
    post: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave?: (postData: any) => void;
}

export function BlogEditDialog({ post, open, onOpenChange, onSave }: BlogEditDialogProps) {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        coverImage: '',
        tags: [] as string[],
        published: false
    });

    // Update form data when post changes
    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title || '',
                excerpt: post.excerpt || '',
                content: post.content || '',
                coverImage: post.coverImage || '',
                tags: post.tags || [],
                published: post.published || false
            });
        } else {
            // Reset for new post
            setFormData({
                title: '',
                excerpt: '',
                content: '',
                coverImage: '',
                tags: [],
                published: false
            });
        }
    }, [post]);

    const handleSave = () => {
        if (onSave) {
            onSave(formData);
        }
        toast.success(`Blog post "${formData.title}" ${post?.id ? 'updated' : 'created'} successfully!`);
        onOpenChange(false);
    };

    const handleTagsChange = (value: string) => {
        const tags = value.split(',').map(t => t.trim()).filter(Boolean);
        setFormData({ ...formData, tags });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {post?.id ? 'Edit Blog Post' : 'Create New Blog Post'}
                    </DialogTitle>
                    <DialogDescription>
                        {post?.id ? 'Make changes to your blog post.' : 'Create a new blog post for your site.'} Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="blog-title" className="text-sm font-semibold">
                            Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="blog-title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter blog post title"
                            className="h-11"
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                        <Label htmlFor="blog-excerpt" className="text-sm font-semibold">
                            Excerpt <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="blog-excerpt"
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            placeholder="Brief summary of the blog post"
                            rows={2}
                            className="resize-none"
                        />
                        <p className="text-xs text-muted-foreground">
                            {formData.excerpt.length} characters
                        </p>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <Label htmlFor="blog-content" className="text-sm font-semibold">
                            Content <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="blog-content"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Write your blog post content here..."
                            rows={8}
                            className="resize-none font-mono text-sm"
                        />
                        <p className="text-xs text-muted-foreground">
                            {formData.content.split(' ').filter(Boolean).length} words • {Math.ceil(formData.content.split(' ').filter(Boolean).length / 200)} min read
                        </p>
                    </div>

                    {/* Cover Image */}
                    <div className="space-y-2">
                        <Label htmlFor="blog-cover" className="text-sm font-semibold">
                            Cover Image URL
                        </Label>
                        <Input
                            id="blog-cover"
                            value={formData.coverImage}
                            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            className="h-11"
                        />
                        {formData.coverImage && (
                            <div className="mt-2 rounded-lg overflow-hidden border-2 border-gray-200">
                                <img
                                    src={formData.coverImage}
                                    alt="Cover preview"
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80";
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                        <Label htmlFor="blog-tags" className="text-sm font-semibold">
                            Tags
                        </Label>
                        <Input
                            id="blog-tags"
                            value={formData.tags.join(', ')}
                            onChange={(e) => handleTagsChange(e.target.value)}
                            placeholder="React, TypeScript, Web Development (comma-separated)"
                            className="h-11"
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.tags.map((tag, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Published Toggle */}
                    <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
                        <div>
                            <Label className="text-sm font-semibold">Publish Status</Label>
                            <p className="text-xs text-gray-600">Make this post visible to the public</p>
                        </div>
                        <Switch
                            checked={formData.published}
                            onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-blue-500"
                        />
                    </div>

                    {/* Preview */}
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">Preview</Label>
                        <div className="p-5 border-2 border-dashed rounded-xl bg-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="w-32 h-24 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                    {formData.coverImage ? (
                                        <img
                                            src={formData.coverImage}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80";
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <FileText className="w-8 h-8" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-lg">{formData.title || 'Blog Post Title'}</h4>
                                        <Badge variant={formData.published ? "default" : "secondary"} className={formData.published ? "bg-gradient-to-r from-green-500 to-green-600" : ""}>
                                            {formData.published ? "Published" : "Draft"}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2">{formData.excerpt || 'Blog post excerpt will appear here'}</p>
                                    {formData.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {formData.tags.slice(0, 3).map((tag, i) => (
                                                <Badge key={i} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {formData.tags.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{formData.tags.length - 3} more
                                                </Badge>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="hover:bg-gray-100"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        disabled={!formData.title || !formData.excerpt || !formData.content}
                    >
                        {post?.id ? 'Save Changes' : 'Create Post'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
