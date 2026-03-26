import { Github, Linkedin, MessageCircle, Mail, Phone, Copy } from 'lucide-react';
import { portfolioData } from '../../constants';

type FooterSectionProps = {
  onCopyEmail: () => void;
};

export function FooterSection({ onCopyEmail }: FooterSectionProps) {
  return (
    <footer className="pt-20 border-t border-zinc-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-3xl font-bold text-zinc-100 mb-6">
            Let&apos;s build something <span className="text-emerald-400">extraordinary</span>.
          </h2>
          <p className="text-zinc-400 mb-8 max-w-md">
            Currently open to senior-level opportunities and high-impact mobile projects.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={portfolioData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`https://wa.me/${portfolioData.socials.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 transition-colors"
              title="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={onCopyEmail}
              className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 transition-colors"
              title="Copy email address"
              aria-label="Copy email address"
            >
              <Mail className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8">
          <h3 className="text-zinc-100 font-semibold mb-6">Quick Contact</h3>
          <div className="space-y-4">
            <a
              href={`tel:${portfolioData.socials.phone}`}
              className="w-full py-4 bg-zinc-800 text-zinc-100 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              Call: {portfolioData.socials.phone}
            </a>
            <button
              type="button"
              onClick={onCopyEmail}
              aria-label="Copy email address"
              className="w-full py-4 px-4 bg-emerald-500 text-zinc-900 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-400 transition-colors group"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span className="min-w-0 truncate text-left flex-1">
                Email: {portfolioData.socials.email}
              </span>
              <Copy
                className="w-4 h-4 shrink-0 opacity-90 group-hover:scale-110 transition-transform"
                aria-hidden
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600 font-mono">
        <p>
          © 2026 {portfolioData.name}. {portfolioData.title}.
        </p>
        <p>Built with React + Tailwind + Motion</p>
      </div>
    </footer>
  );
}
