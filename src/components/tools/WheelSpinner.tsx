import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const WheelSpinner = () => {
    const [items, setItems] = useState("Pizza\nBurger\nSushi\nSalad\nTacos\nPasta");
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();

    // Animation refs
    const rotationRef = useRef(0);
    const velocityRef = useRef(0);
    const requestRef = useRef<number>();

    useEffect(() => {
        drawWheel();
    }, [items]);

    const getItemsArray = () => items.split("\n").filter(i => i.trim() !== "");

    const drawWheel = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const itemList = getItemsArray();
        const len = itemList.length;
        if (len === 0) return;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 20;
        const arc = (2 * Math.PI) / len;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw slices
        itemList.forEach((item, i) => {
            const angle = rotationRef.current + i * arc;

            ctx.beginPath();
            ctx.fillStyle = `hsl(${(i * 360) / len}, 70%, 60%)`;
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angle, angle + arc);
            ctx.lineTo(centerX, centerY);
            ctx.fill();
            ctx.stroke();

            // Draw text
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle + arc / 2);
            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            ctx.font = "bold 16px Inter";
            ctx.fillText(item, radius - 10, 5);
            ctx.restore();
        });

        // Draw pointer
        ctx.beginPath();
        ctx.fillStyle = "#333";
        ctx.moveTo(centerX + 20, centerY - radius - 10);
        ctx.lineTo(centerX - 20, centerY - radius - 10);
        ctx.lineTo(centerX, centerY - radius + 20);
        ctx.fill();
    };

    const spin = () => {
        if (isSpinning) return;
        const itemList = getItemsArray();
        if (itemList.length < 2) {
            toast({ title: "Error", description: "Add at least 2 items to spin", variant: "destructive" });
            return;
        }

        setIsSpinning(true);
        setWinner(null);
        velocityRef.current = 0.5 + Math.random() * 0.5; // Initial velocity
        requestRef.current = requestAnimationFrame(animate);
    };

    const animate = () => {
        rotationRef.current += velocityRef.current;
        velocityRef.current *= 0.985; // Friction

        drawWheel();

        if (velocityRef.current > 0.001) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            setIsSpinning(false);
            velocityRef.current = 0;
            determineWinner();
        }
    };

    const determineWinner = () => {
        const itemList = getItemsArray();
        const len = itemList.length;
        const arc = (2 * Math.PI) / len;

        // Normalize rotation
        const currentRotation = rotationRef.current % (2 * Math.PI);

        // The pointer is at -PI/2 (top). We need to find which slice is there.
        // Slice i is at [rotation + i*arc, rotation + (i+1)*arc]
        // We want to find i such that rotation + i*arc <= -PI/2 <= rotation + (i+1)*arc (modulo 2PI logic)
        // Easier: The pointer is effectively at angle 3*PI/2 (270 deg) relative to the wheel's 0 if we rotate the wheel.
        // Actually, let's just reverse calculate.

        // Angle of the pointer relative to the wheel start (0)
        // Pointer is at -90deg (or 270deg) in canvas space.
        // Effective angle on wheel = (PointerAngle - WheelRotation) % 360

        let angle = (1.5 * Math.PI - currentRotation) % (2 * Math.PI);
        if (angle < 0) angle += 2 * Math.PI;

        const index = Math.floor(angle / arc);
        const winItem = itemList[index];
        setWinner(winItem);

        toast({
            title: "Winner!",
            description: `The wheel selected: ${winItem}`,
        });
    };

    return (
        <div className="space-y-6">
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Wheel Spinner</CardTitle>
                    <CardDescription>Randomly pick an item from your list</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <Label>Items (one per line)</Label>
                            <Textarea
                                value={items}
                                onChange={(e) => setItems(e.target.value)}
                                rows={10}
                                className="font-sans"
                            />
                            <Button onClick={spin} disabled={isSpinning} className="w-full" size="lg">
                                {isSpinning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Spin the Wheel"}
                            </Button>
                            {winner && (
                                <div className="p-4 bg-green-100 text-green-800 rounded-lg text-center font-bold text-xl animate-in fade-in zoom-in">
                                    Winner: {winner}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center items-center">
                            <canvas
                                ref={canvasRef}
                                width={400}
                                height={400}
                                className="max-w-full h-auto"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default WheelSpinner;
