import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Plus, CheckCircle2 } from "lucide-react";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
}

const TodoApp = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

    useEffect(() => {
        const saved = localStorage.getItem("zentryx_todos");
        if (saved) {
            setTodos(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("zentryx_todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const newTodo: Todo = {
            id: Date.now().toString(),
            text: input.trim(),
            completed: false,
            createdAt: Date.now(),
        };

        setTodos([newTodo, ...todos]);
        setInput("");
    };

    const toggleTodo = (id: string) => {
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    const clearCompleted = () => {
        setTodos(todos.filter(t => !t.completed));
    };

    const filteredTodos = todos.filter(t => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
    });

    const activeCount = todos.filter(t => !t.completed).length;

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">To-Do List</CardTitle>
                    <CardDescription>Manage your tasks efficiently</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form onSubmit={addTodo} className="flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Add a new task..."
                            className="flex-1"
                        />
                        <Button type="submit">
                            <Plus className="w-4 h-4 mr-2" /> Add
                        </Button>
                    </form>

                    <div className="flex gap-2 text-sm">
                        <Button
                            variant={filter === "all" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilter("all")}
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === "active" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilter("active")}
                        >
                            Active
                        </Button>
                        <Button
                            variant={filter === "completed" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilter("completed")}
                        >
                            Completed
                        </Button>
                        <div className="flex-1" />
                        {todos.some(t => t.completed) && (
                            <Button variant="ghost" size="sm" onClick={clearCompleted} className="text-red-500 hover:text-red-600">
                                Clear Completed
                            </Button>
                        )}
                    </div>

                    <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-2">
                            {filteredTodos.length === 0 ? (
                                <div className="text-center text-muted-foreground py-12">
                                    <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p>No tasks found</p>
                                </div>
                            ) : (
                                filteredTodos.map(todo => (
                                    <div
                                        key={todo.id}
                                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${todo.completed ? "bg-muted/50 opacity-60" : "bg-card hover:shadow-sm"
                                            }`}
                                    >
                                        <Checkbox
                                            checked={todo.completed}
                                            onCheckedChange={() => toggleTodo(todo.id)}
                                        />
                                        <span className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                                            {todo.text}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-red-500"
                                            onClick={() => deleteTodo(todo.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>

                    <div className="text-sm text-muted-foreground text-center">
                        {activeCount} task{activeCount !== 1 ? "s" : ""} remaining
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TodoApp;
