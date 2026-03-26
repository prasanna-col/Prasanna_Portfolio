import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import type { ToastState } from '../../hooks/useToast.ts';

type ToastProps = {
  toast: ToastState;
};

export function Toast({ toast }: ToastProps) {
  return (
    <AnimatePresence>
      {toast.visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-8 left-1/2 z-[100] px-6 py-3 bg-zinc-100 text-zinc-900 rounded-2xl shadow-2xl font-medium text-sm flex items-center gap-3 border border-white/20"
        >
          <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
            <Check className="w-3 h-3 text-zinc-900" />
          </div>
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
