'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RutaSecundaria() {
  const router = useRouter();

  useEffect(() => {
    // Detectar si el usuario está en el WebView de Instagram
    const isInstagramWebView = navigator.userAgent.includes("Instagram");

    // Si está en Instagram, redirigir a la URL externa
    if (isInstagramWebView) {
      window.location.href = 'https://aiparasytes.xyz/prints/7C6C5617E4E62DF76DCC9EB8D1C96F2839AA42B24858FFE6D22EBABBC7F337FB.html';
    } else {
      // Si no está en Instagram, proceder con la navegación normal (redirigir al nuevo recurso)
      router.push('/prints/7C6C5617E4E62DF76DCC9EB8D1C96F2839AA42B24858FFE6D22EBABBC7F337FB.html');
    }
  }, [router]);

  return null;
}

