// app/components/ChapterSquares.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChapterData } from '@/lib/sections';

interface Props {
  allChapters: ChapterData[];
}

export default function ChapterSquares({ allChapters }: Props) {
  const [readChapters, setReadChapters] = useState<string[]>([]);

  useEffect(() => {
    // Retrieve read chapters from localStorage
    const storedReadChapters = JSON.parse(localStorage.getItem('readChapters') || '[]');
    setReadChapters(storedReadChapters);
  }, []);

  return (
    <nav className="flex flex-wrap justify-center mb-6">
      {allChapters.map((chapter) => {
        const isRead = readChapters.includes(chapter.id);
        return (
          <Link key={chapter.id} href={`/chapters/${chapter.id}`}>
            <div
              className={`w-6 h-6 m-2 cursor-pointer ${
                isRead ? 'bg-green-500' : 'bg-primary'
              } hover:bg-oldPrimary`}
              title={chapter.title}
            ></div>
          </Link>
        );
      })}
    </nav>
  );
}
