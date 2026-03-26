import { motion, AnimatePresence } from 'motion/react';
import { Share2, Check, Phone } from 'lucide-react';
import { portfolioData } from '../../constants';

type NavbarProps = {
  isShared: boolean;
  onShare: () => void;
};

export function Navbar({ isShared, onShare }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-zinc-900 font-bold">
            PV
          </div>
          <span className="text-zinc-100 font-medium tracking-tight">{portfolioData.name}</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#about" className="hover:text-emerald-400 transition-colors">
            About
          </a>
          <a href="#skills" className="hover:text-emerald-400 transition-colors">
            Skills
          </a>
          <a href="#experience" className="hover:text-emerald-400 transition-colors">
            Experience
          </a>
          <a href="#projects" className="hover:text-emerald-400 transition-colors">
            Projects
          </a>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onShare}
            className="p-2 text-zinc-400 hover:text-emerald-400 transition-colors relative"
            title="Share Portfolio"
          >
            <AnimatePresence mode="wait">
              {isShared ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="share"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Share2 className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <a
            href={`tel:${portfolioData.socials.phone}`}
            className="p-2 bg-zinc-900 text-emerald-400 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800"
            title="Call Me"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </nav>
  );
}
