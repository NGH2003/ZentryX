import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const useConfettiCelebration = () => {
    const celebrate = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    };

    return { celebrate };
};

export const useAdminKeyboardShortcuts = (
    setIsAddToolDialogOpen: (open: boolean) => void,
    setIsCommandPaletteOpen?: (open: boolean) => void
) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl+K or Cmd+K for command palette
            if ((e.ctrlKey || e.metaKey) && e.key === 'k' && setIsCommandPaletteOpen) {
                e.preventDefault();
                setIsCommandPaletteOpen(true);
            }
            // Ctrl+N or Cmd+N for new tool
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                setIsAddToolDialogOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setIsAddToolDialogOpen, setIsCommandPaletteOpen]);
};

// Fun admin messages
export const getRandomSuccessMessage = () => {
    const messages = [
        "🎉 Boom! Tool added like a boss!",
        "✨ Magic! Your tool is now live!",
        "🚀 Tool deployed successfully!",
        "🎯 Nailed it! Tool added!",
        "⚡ Lightning fast! Tool is ready!",
        "🌟 Awesome! New tool unlocked!",
        "🎊 Celebration time! Tool added!",
        "💫 Spectacular! Tool is live!",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
};
