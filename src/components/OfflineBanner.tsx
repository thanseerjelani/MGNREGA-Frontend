import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineBanner = () => {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                await fetch('/api/health', { method: 'HEAD' });
                setIsOffline(false);
            } catch {
                setIsOffline(true);
            }
        };

        checkConnection();
        const interval = setInterval(checkConnection, 30000); // Check every 30s

        return () => clearInterval(interval);
    }, []);

    if (!isOffline) return null;

    return (
        <div className="bg-yellow-500 text-white px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-2">
                <WifiOff className="w-5 h-5" />
                <span className="font-semibold">Service temporarily unavailable. Please try again later.</span>
            </div>
        </div>
    );
};