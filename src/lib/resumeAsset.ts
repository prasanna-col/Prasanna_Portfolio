/**
 * Resolves the single PDF under `src/my_resume/` at build time (Vite glob).
 */
export function getResumeAsset(): { url: string | undefined; fileName: string } {
  const entries = Object.entries(
    import.meta.glob('../my_resume/*.pdf', {
      eager: true,
      query: '?url',
      import: 'default',
    }) as Record<string, string>,
  );
  const [modulePath, url] = entries[0] ?? [];
  const fileName = modulePath?.match(/([^/]+\.pdf)$/i)?.[1] ?? 'Resume.pdf';
  return { url, fileName };
}
