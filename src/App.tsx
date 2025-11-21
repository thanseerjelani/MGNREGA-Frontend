import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { useStore } from '@/store/useStore';
import { Header } from '@/components/Header';
import { Selection } from '@/components/Selection';
import { Dashboard } from '@/components/Dashboard';
import { OfflineBanner } from '@/components/OfflineBanner';

function App() {
  const { setIsOffline } = useStore();

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setIsOffline]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <OfflineBanner />
        <Header />

        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <Selection />
          <Dashboard />
        </main>

        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg">© 2025 Our Voice, Our Rights — MGNREGA Dashboard</p>
<p className="text-sm mt-2 opacity-75">Built for Citizens. Built for Inclusion. Built for Bharat.</p>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
