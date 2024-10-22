// app/page.tsx

import { getSortedArticlesData, ArticleData } from '@/lib/articles';
import Link from 'next/link';

export default async function HomePage() {
  const allArticlesData: ArticleData[] = getSortedArticlesData();

  return (
    <section>
      <h1>Articles</h1>
      <ul>
        {allArticlesData.map(({ id, date, title }) => (
          <li key={id}>
            <Link href={`/articles/${id}`}>{title}</Link>
            <br />
            <small>{date}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
