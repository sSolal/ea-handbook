// app/components/ChapterContent.tsx
'use client';

import { useEffect } from 'react';
import { ChapterData } from '@/lib/sections';

interface Props {
  chapterData: ChapterData;
}

export default function ChapterContent({ chapterData }: Props) {
  const { id, title, contentHtml } = chapterData;

  useEffect(() => {
    // Record the chapter as read in localStorage
    if (typeof window !== 'undefined') {
      const readChapters: string[] = JSON.parse(localStorage.getItem('readChapters') || '[]');
      if (!readChapters.includes(id)) {
        readChapters.push(id);
        localStorage.setItem('readChapters', JSON.stringify(readChapters));
      }
    }
  }, [id]);

  return (
    <article>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml || '' }} />
    </article>
  );
}
