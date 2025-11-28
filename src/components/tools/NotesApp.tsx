import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Note {
    id: string;
    title: string;
    content: string;
    updatedAt: number;
}

const NotesApp = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const saved = localStorage.getItem("zentryx_notes");
        if (saved) {
            setNotes(JSON.parse(saved));
        } else {
            createNewNote();
        }
    }, []);

    useEffect(() => {
        if (notes.length > 0) {
            localStorage.setItem("zentryx_notes", JSON.stringify(notes));
        }
    }, [notes]);

    const createNewNote = () => {
        const newNote: Note = {
            id: Date.now().toString(),
            title: "New Note",
            content: "",
            updatedAt: Date.now(),
        };
        setNotes([newNote, ...notes]);
        setActiveNoteId(newNote.id);
    };

    const updateNote = (id: string, updates: Partial<Note>) => {
        setNotes(notes.map(note =>
            note.id === id ? { ...note, ...updates, updatedAt: Date.now() } : note
        ));
    };

    const deleteNote = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newNotes = notes.filter(n => n.id !== id);
        setNotes(newNotes);
        if (activeNoteId === id) {
            setActiveNoteId(newNotes[0]?.id || null);
        }
        toast({ title: "Deleted", description: "Note deleted successfully" });
    };

    const activeNote = notes.find(n => n.id === activeNoteId);

    return (
        <div className="space-y-6 h-[600px]">
            <Card className="border-0 bg-white/90 backdrop-blur-sm h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="text-2xl">Notes App</CardTitle>
                    <CardDescription>Simple offline notes with auto-save</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex gap-6 overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-1/3 flex flex-col gap-4 border-r pr-4">
                        <Button onClick={createNewNote} className="w-full">
                            <Plus className="w-4 h-4 mr-2" /> New Note
                        </Button>
                        <ScrollArea className="flex-1">
                            <div className="space-y-2">
                                {notes.map(note => (
                                    <div
                                        key={note.id}
                                        onClick={() => setActiveNoteId(note.id)}
                                        className={`p-3 rounded-lg cursor-pointer transition-colors group flex justify-between items-start ${activeNoteId === note.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="font-medium truncate">{note.title || "Untitled"}</div>
                                            <div className="text-xs text-muted-foreground truncate">
                                                {new Date(note.updatedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => deleteNote(note.id, e)}
                                        >
                                            <Trash2 className="w-3 h-3 text-red-500" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Editor */}
                    <div className="flex-1 flex flex-col gap-4">
                        {activeNote ? (
                            <>
                                <Input
                                    value={activeNote.title}
                                    onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                                    className="text-lg font-bold border-none px-0 focus-visible:ring-0"
                                    placeholder="Note Title"
                                />
                                <Textarea
                                    value={activeNote.content}
                                    onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
                                    className="flex-1 resize-none border-none p-0 focus-visible:ring-0 text-base leading-relaxed"
                                    placeholder="Start typing..."
                                />
                                <div className="text-xs text-muted-foreground text-right flex items-center justify-end gap-2">
                                    <Save className="w-3 h-3" /> Saved locally
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-muted-foreground">
                                Select or create a note
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default NotesApp;
