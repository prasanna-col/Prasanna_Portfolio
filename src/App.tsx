import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Code2, 
  Database, 
  Globe, 
  MapPin, 
  CreditCard, 
  Cpu, 
  Briefcase, 
  Calendar, 
  Users, 
  ChevronRight,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  Terminal,
  Download,
  Share2,
  Check,
  Copy,
  MessageCircle,
  Heart,
  Star,
  Send,
  Phone
} from 'lucide-react';
import { portfolioData } from './constants';

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode; icon: any }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-zinc-900 rounded-lg">
      <Icon className="w-5 h-5 text-emerald-400" />
    </div>
    <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">{children}</h2>
  </div>
);

const SkillBadge = ({ skill, ...props }: { skill: string; [key: string]: any }) => (
  <span {...props} className="px-3 py-1 text-xs font-medium bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 rounded-full hover:border-emerald-500/50 transition-colors">
    {skill}
  </span>
);

export default function App() {
  const [isShared, setIsShared] = useState(false);
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [interested, setInterested] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 4000);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${portfolioData.name} - ${portfolioData.title}`,
      text: `Check out ${portfolioData.name}'s professional portfolio. Senior React Native Developer with ${portfolioData.yearsOfExperience} experience.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsShared(true);
        showToast("Portfolio link copied to clipboard!");
        setTimeout(() => setIsShared(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleDownloadResume = () => {
    showToast("Preparing your resume for download...");
    window.print();
  };

  const handleInteraction = async (type: 'like' | 'interest') => {
    if (type === 'like') setLiked(!liked);
    if (type === 'interest') setInterested(!interested);
    
    showToast(`Sending your ${type}...`);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: type === 'like' ? 'Like' : 'Interest',
          content: `Someone ${type === 'like' ? 'liked' : 'showed interest in'} your portfolio.`
        }),
      });

      if (response.ok) {
        showToast(`Thank you! Your ${type} has been received.`);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error:', error);
      showToast("Couldn't send interaction. Please try again later.");
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    showToast("Sending your comment...");
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Comment',
          content: comment
        }),
      });

      if (response.ok) {
        showToast("Thank you! Your feedback has been received.");
        setComment('');
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error:', error);
      showToast("Couldn't send comment. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-400 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Toast Notification */}
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
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-zinc-900 font-bold">PV</div>
            <span className="text-zinc-100 font-medium tracking-tight">{portfolioData.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a>
            <a href="#experience" className="hover:text-emerald-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleShare}
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
            <div className="flex items-center gap-2">
              <a 
                href={`tel:${portfolioData.socials.phone}`}
                className="p-2 bg-zinc-900 text-emerald-400 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800"
                title="Call Me"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href={`mailto:${portfolioData.socials.email}?subject=Inquiry from Portfolio&body=Hi ${portfolioData.name},`}
                className="px-4 py-2 bg-zinc-100 text-zinc-900 rounded-full text-sm font-semibold hover:bg-emerald-400 transition-colors"
              >
                Email Me
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section id="about" className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
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
                <span className="text-sm font-medium text-zinc-200">{portfolioData.yearsOfExperience} Years Exp</span>
              </div>
              <button 
                onClick={handleDownloadResume}
                className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-zinc-900 rounded-xl font-bold hover:bg-emerald-400 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
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
                  {category.skills.map(skill => (
                    <SkillBadge key={skill} skill={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-32">
          <SectionTitle icon={Briefcase}>Professional Journey</SectionTitle>
          <div className="space-y-12">
            {portfolioData.experience.map((exp, idx) => (
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

        {/* Projects Section */}
        <section id="projects" className="mb-32">
          <SectionTitle icon={Smartphone}>Featured Projects</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, idx) => (
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
                  <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map(tech => (
                      <span key={tech} className="text-[11px] font-mono text-zinc-500 bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-700/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-sm font-semibold text-zinc-200 group-hover:translate-x-1 transition-transform">
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

        {/* Feedback Section */}
        <section className="mb-32">
          <SectionTitle icon={MessageCircle}>Quick Feedback</SectionTitle>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 max-w-2xl">
            <div className="flex items-center gap-6 mb-8">
              <button 
                onClick={() => handleInteraction('like')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${liked ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-emerald-400' : ''}`} />
                Like
              </button>
              <button 
                onClick={() => handleInteraction('interest')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${interested ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}
              >
                <Star className={`w-4 h-4 ${interested ? 'fill-emerald-400' : ''}`} />
                Interested
              </button>
            </div>
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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

        {/* Footer / Contact */}
        <footer className="pt-20 border-t border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-bold text-zinc-100 mb-6">Let's build something <span className="text-emerald-400">extraordinary</span>.</h2>
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
                <a 
                  href={`mailto:${portfolioData.socials.email}?subject=Inquiry from Portfolio&body=Hi ${portfolioData.name},`}
                  className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
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
                <a 
                  href={`mailto:${portfolioData.socials.email}?subject=Inquiry from Portfolio&body=Hi ${portfolioData.name},`}
                  className="w-full py-4 bg-emerald-500 text-zinc-900 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email: {portfolioData.socials.email}
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600 font-mono">
            <p>© 2026 {portfolioData.name}. {portfolioData.title}.</p>
            <p>Built with React + Tailwind + Motion</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
