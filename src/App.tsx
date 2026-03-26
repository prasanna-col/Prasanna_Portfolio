import { usePortfolioPage } from './hooks/usePortfolioPage.ts';
import { Toast } from './components/layout/Toast.tsx';
import { Navbar } from './components/layout/Navbar.tsx';
import { HeroSection } from './components/sections/HeroSection.tsx';
import { SkillsSection } from './components/sections/SkillsSection.tsx';
import { ExperienceSection } from './components/sections/ExperienceSection.tsx';
import { ProjectsSection } from './components/sections/ProjectsSection.tsx';
import { FeedbackSection } from './components/sections/FeedbackSection.tsx';
import { FooterSection } from './components/sections/FooterSection.tsx';

/**
 * Portfolio shell: layout + sections. State and handlers live in `usePortfolioPage`.
 */
export default function App() {
  const page = usePortfolioPage();

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-400 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Toast toast={page.toast} />
      <Navbar isShared={page.isShared} onShare={page.handleShare} />

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <HeroSection onDownloadResume={page.handleDownloadResume} />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <FeedbackSection
          liked={page.liked}
          interested={page.interested}
          comment={page.comment}
          onCommentChange={page.setComment}
          onInteraction={page.handleInteraction}
          onCommentSubmit={page.handleCommentSubmit}
        />
        <FooterSection onCopyEmail={page.handleCopyEmail} />
      </main>
    </div>
  );
}
