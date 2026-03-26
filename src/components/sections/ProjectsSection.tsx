import { motion } from 'motion/react';
import { Smartphone, Users, ChevronRight, ExternalLink } from 'lucide-react';
import { portfolioData } from '../../constants';
import { SectionTitle } from '../ui/SectionTitle.tsx';

export function ProjectsSection() {
  return (
    <section id="projects" className="mb-32">
      <SectionTitle icon={Smartphone}>Featured Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolioData.projects.map((project) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-500/20">
                  {project.duration}
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                  <Users className="w-3.5 h-3.5" />
                  Team of {project.teamSize}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-zinc-100 mb-3 group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono text-zinc-500 bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-700/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="flex items-center gap-2 text-sm font-semibold text-zinc-200 group-hover:translate-x-1 transition-transform"
              >
                View Details <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-5 h-5 text-zinc-600" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
