import type { FormEvent } from 'react';
import { MessageCircle, Heart, Star, Send } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle.tsx';

type FeedbackSectionProps = {
  liked: boolean;
  interested: boolean;
  comment: string;
  onCommentChange: (value: string) => void;
  onInteraction: (type: 'like' | 'interest') => void;
  onCommentSubmit: (e: FormEvent) => void;
};

export function FeedbackSection({
  liked,
  interested,
  comment,
  onCommentChange,
  onInteraction,
  onCommentSubmit,
}: FeedbackSectionProps) {
  return (
    <section className="mb-32">
      <SectionTitle icon={MessageCircle}>Quick Feedback</SectionTitle>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 max-w-2xl">
        <div className="flex items-center gap-6 mb-8">
          <button
            type="button"
            onClick={() => onInteraction('like')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
              liked
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-emerald-400' : ''}`} />
            Like
          </button>
          <button
            type="button"
            onClick={() => onInteraction('interest')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
              interested
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600'
            }`}
          >
            <Star className={`w-4 h-4 ${interested ? 'fill-emerald-400' : ''}`} />
            Interested
          </button>
        </div>
        <form onSubmit={onCommentSubmit} className="space-y-4">
          <textarea
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Leave a quick comment or suggestion..."
            className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-zinc-900 rounded-xl font-bold hover:bg-emerald-400 transition-colors"
          >
            <Send className="w-4 h-4" />
            Send Comment
          </button>
        </form>
      </div>
    </section>
  );
}
