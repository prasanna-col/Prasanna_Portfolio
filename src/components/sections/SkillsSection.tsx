import { motion } from 'motion/react';
import { Code2, ChevronRight } from 'lucide-react';
import { portfolioData } from '../../constants';
import { SectionTitle } from '../ui/SectionTitle.tsx';
import { SkillBadge } from '../ui/SkillBadge.tsx';

export function SkillsSection() {
  return (
    <section id="skills" className="mb-32">
      <SectionTitle icon={Code2}>Technical Arsenal</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.skills.map((category, idx) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors group"
          >
            <h3 className="text-zinc-100 font-medium mb-4 flex items-center justify-between">
              {category.category}
              <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
