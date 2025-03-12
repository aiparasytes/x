'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RutaSecundaria() {
  const router = useRouter();

  useEffect(() => {
    router.push('/prints/7C6C5617E4E62DF76DCC9EB8D1C96F2839AA42B24858FFE6D22EBABBC7F337FB.html');
  }, [router]);

  return null;
}
