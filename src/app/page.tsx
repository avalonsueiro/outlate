'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/MockAuthContext';
import { ROUTES } from '@/lib/constants';
import { LoadingSpinner } from '@/components/ui';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace(ROUTES.DASHBOARD);
      } else {
        router.replace(ROUTES.SIGN_IN);
      }
    }
  }, [user, loading, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background-primary">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-text-secondary">Loading...</p>
      </div>
    </main>
  );
}
