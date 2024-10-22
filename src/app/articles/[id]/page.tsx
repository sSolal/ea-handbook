// app/articles/[id]/page.tsx

import { getArticleData, getAllArticleIds, ArticleData } from '@/lib/articles';
import type { Metadata } from 'next';

type Props = {
  params:Promise<{id:string}>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const ids = getAllArticleIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolved = await params;
  const articleData = await getArticleData(resolved.id);
  return { title: articleData.title };
}

export default async function ArticlePage({ params }: Props) {
  const resolved = await params;
  const articleData: ArticleData = await getArticleData(resolved.id);

  return (
    <article>
      <h1>{articleData.title}</h1>
      <p>{articleData.date.toString()}</p>
      <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml || '' }} />
    </article>
  );
}
