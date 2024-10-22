// lib/articles.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface ArticleData {
  id: string;
  title: string;
  date: string;
  contentHtml?: string;
}

export function getSortedArticlesData(): ArticleData[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { title: string; date: string }),
    };
  });
  return allArticlesData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllArticleIds(): string[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
}

export async function getArticleData(id: string): Promise<ArticleData> {
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const { remark } = await import('remark');
  const remarkHtml = (await import('remark-html')).default;
  const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as { title: string; date: string }),
  };
}
