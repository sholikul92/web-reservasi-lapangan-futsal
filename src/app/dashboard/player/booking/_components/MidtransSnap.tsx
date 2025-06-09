'use client';

import { useEffect } from 'react';

export const MidtransSnapScript = () => {
  useEffect(() => {
    const midtransScript = document.createElement('script');
    midtransScript.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    midtransScript.setAttribute(
      'data-client-key',
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!
    );
    midtransScript.async = true;
    document.body.appendChild(midtransScript);

    return () => {
      document.body.removeChild(midtransScript);
    };
  }, []);

  return null;
};
