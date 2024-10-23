// app/page.tsx

import { getAllSectionsData, getChaptersBySection, SectionData, ChapterData } from '@/lib/sections';
import ChapterSquares from '@/components/ChapterSquares';
import ChapterList from '@/components/ChapterList';
import Link from 'next/link';

export default async function HomePage() {
  const sections: SectionData[] = getAllSectionsData();
  const chaptersBySection: { [key: string]: ChapterData[] } = getChaptersBySection();
  const allChapters: ChapterData[] = Object.values(chaptersBySection).flat();

  return (
    <div className="flex flex-col items-center px-5 max-w-5xl mx-auto">
      {/* Header */}
      <header className="w-full py-8 text-center">
        <h1 className="text-3xl font-bold text-headings">Le handbook AE</h1>
      </header>

      {/* Top Bar with Squares */}
      <ChapterSquares allChapters={allChapters} />

      {/* Guide Presentation */}
      <section className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-headings">Présentation du guide</h2>
        <p className="text-text max-w-2xl mx-auto">
          L&apos;altruisme efficace (AE) est un projet visant à trouver en permanence les meilleures façons de faire le bien et à les mettre en pratique.
          <br /><br />
          Cette série d&apos;articles vous présentera certains des principaux outils de réflexion qui sous-tendent l&apos;altruisme efficace, il exposera certains des arguments visant à déterminer quels problèmes mondiaux sont les plus urgents et il vous aidera à réfléchir à la manière dont vous pouvez personnellement contribuer à ce mouvement.
          <br /><br />
          Le manuel est structuré en huit chapitres et comprend des exercices pour vous aider à réfléchir au contenu. Si vous souhaitez discuter de ces idées avec d&apos;autres personnes désireuses d&apos;améliorer la vie d&apos;autrui, vous serez peut-être intéressé par notre programme gratuit d&apos;introduction à l&apos;AE, qui s&apos;appuie sur ce manuel.
        </p>
      </section>

      {/* Sections and Chapters */}
      <main className="w-full">
        {sections.map((section) => (
          <div key={section.id} className="flex flex-wrap mb-10 p-6 border border-gray-200 rounded-lg">
            {/* Section Text */}
            <div className="flex-1 pr-6">
              <h3 className="text-xl font-semibold text-headings mb-4">{section.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: section.contentHtml || '' }} />
            </div>

            {/* Vertical Chapters List */}
            <div className="flex-1">
              <ChapterList chapters={chaptersBySection[section.id] || []} />
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center border-t border-gray-200">
        <p className="text-text">
          © {new Date().getFullYear()} Le handbook AE. Tous droits réservés.
        </p>
        <nav className="flex justify-center mt-4 space-x-4">
          <Link href="/about" className="text-primary hover:text-oldPrimary">À propos</Link>
          <Link href="/contact" className="text-primary hover:text-oldPrimary">Contact</Link>
          <Link href="/privacy" className="text-primary hover:text-oldPrimary">Politique de confidentialité</Link>
        </nav>
      </footer>
    </div>
  );
}
