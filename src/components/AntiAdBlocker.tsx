import { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export const AntiAdBlocker = () => {
    const [isAdBlockerActive, setIsAdBlockerActive] = useState(false);

    useEffect(() => {
        // Method 1: Try to fetch a known ad script (often blocked)
        const checkAdBlocker = async () => {
            try {
                // Create a dummy ad element
                const adDiv = document.createElement('div');
                adDiv.className = 'adsbox';
                adDiv.style.position = 'absolute';
                adDiv.style.top = '-1000px';
                adDiv.style.left = '-1000px';
                adDiv.innerHTML = '&nbsp;';
                document.body.appendChild(adDiv);

                // Wait a tick
                await new Promise(resolve => setTimeout(resolve, 100));

                // Check if the element was hidden or removed by ad blocker
                if (adDiv.offsetHeight === 0 || adDiv.style.display === 'none') {
                    setIsAdBlockerActive(true);
                }

                document.body.removeChild(adDiv);
            } catch (e) {
                // If fetch fails, it might be blocked
                setIsAdBlockerActive(true);
            }
        };

        // Run check
        checkAdBlocker();

        // Also try to load a bait script
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        script.onerror = () => setIsAdBlockerActive(true);
        // Don't actually append it to avoid real errors, just the onerror might trigger if we tried
        // But for safety, let's stick to the DOM element check which is less intrusive

    }, []);

    if (!isAdBlockerActive) return null;

    return (
        <Dialog open={isAdBlockerActive} onOpenChange={() => { }}>
            <DialogContent className="sm:max-w-[425px] [&>button]:hidden" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
                <DialogHeader>
                    <div className="mx-auto bg-red-100 p-3 rounded-full mb-4">
                        <ShieldAlert className="w-8 h-8 text-red-600" />
                    </div>
                    <DialogTitle className="text-center text-xl">Ad Blocker Detected</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                        We noticed you are using an ad blocker. Our tools are free to use thanks to our sponsors.
                        <br /><br />
                        Please disable your ad blocker to continue using our free tools.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center pt-4">
                    <Button
                        onClick={() => window.location.reload()}
                        variant="default"
                        className="w-full"
                    >
                        I've Disabled It
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
