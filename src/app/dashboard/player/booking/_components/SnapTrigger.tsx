/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef } from "react";

export default function SnapTrigger({ token, onClose }: { token: string | null; onClose?: () => void }) {
  const hasPaid = useRef(false);

  useEffect(() => {
    if (!hasPaid.current && typeof window !== "undefined" && (window as any).snap) {
      hasPaid.current = true;

      (window as any).snap.pay(token, {
        onSuccess: () => {
          window.location.href = "/dashboard/player/booking/success";
          onClose?.();
        },
        onPending: () => {
          window.location.href = "/dashboard/player/booking/pending";
          onClose?.();
        },
        onError: () => {
          window.location.href = "/dashboard/player/booking/failed";
          onClose?.();
        },
        onClose: () => {
          alert("Kamu menutup popup tanpa menyelesaikan pembayaran");
          onClose?.();
        },
      });
    }
  }, [token]);

  return null;
}
