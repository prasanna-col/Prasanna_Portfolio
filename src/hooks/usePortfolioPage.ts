import { useState, useCallback, type FormEvent } from 'react';
import { portfolioData } from '../constants';
import {
  getClientUserAgent,
  postFeedback,
  readFeedbackErrorMessage,
} from '../api/feedback.ts';
import { getResumeAsset } from '../lib/resumeAsset.ts';
import { useToast } from './useToast.ts';

const { url: resumePdfUrl, fileName: resumeDownloadFileName } = getResumeAsset();

export function usePortfolioPage() {
  const { toast, showToast } = useToast();
  const [isShared, setIsShared] = useState(false);
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [interested, setInterested] = useState(false);

  const handleShare = useCallback(async () => {
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
        showToast('Portfolio link copied to clipboard!');
        setTimeout(() => setIsShared(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  }, [showToast]);

  const handleDownloadResume = useCallback(() => {
    if (!resumePdfUrl) {
      showToast('Resume PDF not found in src/my_resume.');
      return;
    }
    showToast('Downloading resume…');
    const link = document.createElement('a');
    link.href = resumePdfUrl;
    link.download = resumeDownloadFileName;
    link.rel = 'noopener';
    link.click();
  }, [showToast]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.socials.email);
      showToast('Email address copied!');
    } catch {
      showToast('Could not copy email.');
    }
  }, [showToast]);

  const handleInteraction = useCallback(
    async (type: 'like' | 'interest') => {
      if (type === 'like') setLiked((v) => !v);
      if (type === 'interest') setInterested((v) => !v);

      showToast(`Sending your ${type}...`);

      try {
        const response = await postFeedback({
          type: type === 'like' ? 'Like' : 'Interest',
          content: `Someone ${type === 'like' ? 'liked' : 'showed interest in'} your portfolio.`,
          userAgent: getClientUserAgent(),
        });

        if (response.ok) {
          showToast(`Thank you! Your ${type} has been received.`);
        } else {
          throw new Error(await readFeedbackErrorMessage(response));
        }
      } catch (error) {
        console.error('Error:', error);
        const msg = error instanceof Error ? error.message : '';
        showToast(
          msg ? `Couldn't send: ${msg}` : "Couldn't send interaction. Please try again later.",
        );
      }
    },
    [showToast],
  );

  const handleCommentSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!comment.trim()) return;

      showToast('Sending your comment...');

      try {
        const response = await postFeedback({
          type: 'Comment',
          content: comment,
          userAgent: getClientUserAgent(),
        });

        if (response.ok) {
          showToast('Thank you! Your feedback has been received.');
          setComment('');
        } else {
          throw new Error(await readFeedbackErrorMessage(response));
        }
      } catch (error) {
        console.error('Error:', error);
        const msg = error instanceof Error ? error.message : '';
        showToast(
          msg ? `Couldn't send: ${msg}` : "Couldn't send comment. Please try again later.",
        );
      }
    },
    [comment, showToast],
  );

  return {
    toast,
    isShared,
    comment,
    setComment,
    liked,
    interested,
    handleShare,
    handleDownloadResume,
    handleCopyEmail,
    handleInteraction,
    handleCommentSubmit,
  };
}
