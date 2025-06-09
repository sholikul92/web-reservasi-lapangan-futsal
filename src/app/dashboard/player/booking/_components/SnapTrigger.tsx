/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useRef } from 'react';

export default function SnapTrigger({
  token,
  onClose,
}: {
  token: string | null;
  onClose?: () => void;
}) {
  const hasPaid = useRef(false);

  useEffect(() => {
    if (
      !hasPaid.current &&
      typeof window !== 'undefined' &&
      (window as any).snap
    ) {
      hasPaid.current = true;

      (window as any).snap.pay(token, {
        onSuccess: () => {
          window.location.href = '/booking/success';
          onClose?.();
        },
        onPending: () => {
          window.location.href = '/booking/pending';
          onClose?.();
        },
        onError: () => {
          window.location.href = '/booking/failed';
          onClose?.();
        },
        onClose: () => {
          alert('Kamu menutup popup tanpa menyelesaikan pembayaran');
          onClose?.();
        },
      });
    }
  }, [token]);

  return null;
}
