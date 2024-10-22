// app/chapters/[id]/page.tsx

import { getChapterData, getAllChapterIds, ChapterData } from '@/lib/sections';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const ids = getAllChapterIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolved = await params;
  const chapterData = await getChapterData(resolved.id);
  return { title: chapterData.title };
}

export default async function ChapterPage({ params }: Props) {
  const resolved = await params;
  const chapterData: ChapterData = await getChapterData(resolved.id);

  return (
    <article>
      <h1>{chapterData.title}</h1>
      {/* Include date if you have it */}
      {/* <p>{chapterData.date.toString()}</p> */}
      <div dangerouslySetInnerHTML={{ __html: chapterData.contentHtml || '' }} />
    </article>
  );
}
