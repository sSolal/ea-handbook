// app/components/ChapterList.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChapterData } from '@/lib/sections';

interface Props {
  chapters: ChapterData[];
}

export default function ChapterList({ chapters }: Props) {
  const [readChapters, setReadChapters] = useState<string[]>([]);

  useEffect(() => {
    // Retrieve read chapters from localStorage
    const storedReadChapters = JSON.parse(localStorage.getItem('readChapters') || '[]');
    setReadChapters(storedReadChapters);
  }, []);

  return (
    <ul className="space-y-4">
      {chapters.map((chapter) => {
        const isRead = readChapters.includes(chapter.id);
        return (
          <li key={chapter.id} className="flex items-center">
            <Link href={`/chapters/${chapter.id}`}>
              <div
                className={`w-6 h-6 mr-4 cursor-pointer ${
                  isRead ? 'bg-green-500' : 'bg-primary'
                } hover:bg-oldPrimary`}
                title={chapter.title}
              ></div>
            </Link>
            <Link href={`/chapters/${chapter.id}`} className="text-text hover:underline">
              {chapter.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
