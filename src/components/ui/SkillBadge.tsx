import type { HTMLAttributes } from 'react';

type SkillBadgeProps = {
  skill: string;
} & HTMLAttributes<HTMLSpanElement>;

export function SkillBadge({ skill, className = '', ...props }: SkillBadgeProps) {
  return (
    <span
      {...props}
      className={`px-3 py-1 text-xs font-medium bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 rounded-full hover:border-emerald-500/50 transition-colors ${className}`}
    >
      {skill}
    </span>
  );
}
