'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RutaSecundaria() {
  const router = useRouter();

  useEffect(() => {
    router.push('/prints/x.html');
  }, [router]);

  return null;
}
