'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/Skeleton';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem('token');
    router.replace(t ? '/appointments' : '/login');
  }, [router]);

  return (
    <div className="h-[calc(100vh-56px)] grid place-items-center">
      <div className="w-full max-w-md card">
        <div className="card-body space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
