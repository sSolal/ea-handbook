// app/page.tsx

import { getAllSectionsData, getChaptersBySection, SectionData, ChapterData } from '@/lib/sections';
import Link from 'next/link';

export default async function HomePage() {
  const sections: SectionData[] = getAllSectionsData();
  const chaptersBySection: { [key: string]: ChapterData[] } = getChaptersBySection();

  return (
    <section>
      <h1>AE Handbook</h1>
      {sections.map((section) => (
        <div key={section.id}>
          <h2>{section.title}</h2>
          <ul>
            {chaptersBySection[section.id]?.map((chapter) => (
              <li key={chapter.id}>
                <Link href={`/chapters/${chapter.id}`}>{chapter.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
