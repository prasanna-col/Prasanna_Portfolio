import { useState, useCallback } from 'react';

export type ToastState = { message: string; visible: boolean };

export function useToast(hideAfterMs = 4000) {
  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });

  const showToast = useCallback(
    (message: string) => {
      setToast({ message, visible: true });
      setTimeout(() => setToast({ message: '', visible: false }), hideAfterMs);
    },
    [hideAfterMs],
  );

  return { toast, showToast };
}
