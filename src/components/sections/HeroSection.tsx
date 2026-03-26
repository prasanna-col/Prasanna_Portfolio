import { motion } from 'motion/react';
import { Smartphone, Terminal, Download } from 'lucide-react';
import { portfolioData } from '../../constants';

type HeroSectionProps = {
  onDownloadResume: () => void;
};

export function HeroSection({ onDownloadResume }: HeroSectionProps) {
  return (
    <section id="about" className="mb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Available for new projects
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-zinc-100 tracking-tight mb-6 leading-[1.1]">
          {portfolioData.title} <br />
          <span className="text-zinc-500">Crafting Mobile Excellence.</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          {portfolioData.summary}
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-zinc-200">iOS & Android Expert</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-zinc-200">
              {portfolioData.yearsOfExperience} Years Exp
            </span>
          </div>
          <button
            type="button"
            onClick={onDownloadResume}
            className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-zinc-900 rounded-xl font-bold hover:bg-emerald-400 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </button>
        </div>
      </motion.div>
    </section>
  );
}
