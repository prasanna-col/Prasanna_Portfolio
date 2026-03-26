import { motion } from 'motion/react';
import { Briefcase, Calendar, ExternalLink } from 'lucide-react';
import { portfolioData } from '../../constants';
import { SectionTitle } from '../ui/SectionTitle.tsx';

export function ExperienceSection() {
  return (
    <section id="experience" className="mb-32">
      <SectionTitle icon={Briefcase}>Professional Journey</SectionTitle>
      <div className="space-y-12">
        {portfolioData.experience.map((exp) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-8 border-l border-zinc-800"
          >
            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <div>
                <h3 className="text-xl font-bold text-zinc-100">{exp.designation}</h3>
                {exp.url ? (
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-medium hover:underline inline-flex items-center gap-1 group/link"
                  >
                    {exp.company}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <p className="text-emerald-400 font-medium">{exp.company}</p>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                <Calendar className="w-3.5 h-3.5" />
                {exp.duration}
              </div>
            </div>
            <ul className="space-y-3">
              {exp.responsibilities.map((resp, i) => (
                <li key={i} className="flex gap-3 text-zinc-400 text-sm leading-relaxed">
                  <span className="text-emerald-500 mt-1.5">•</span>
                  {resp}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
