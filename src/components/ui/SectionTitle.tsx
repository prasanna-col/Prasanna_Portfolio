import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

type SectionTitleProps = {
  children: ReactNode;
  icon: LucideIcon;
};

export function SectionTitle({ children, icon: Icon }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="p-2 bg-zinc-900 rounded-lg">
        <Icon className="w-5 h-5 text-emerald-400" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">{children}</h2>
    </div>
  );
}
