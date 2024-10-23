// lib/sections.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const chaptersDirectory = path.join(process.cwd(), 'content/chapters');
const sectionsDirectory = path.join(process.cwd(), 'content/sections');

export interface SectionData {
    id: string;
    title: string;
    order: number;
    contentHtml?: string;
  }
  
  export interface ChapterData {
    id: string;
    section: string;
    title: string;
    order: number;
    contentHtml?: string;
  }


export function getAllChapterIds(): string[] {
  const chapters = getAllChaptersData();
  return chapters.map((chapter) => chapter.id);
}

export async function getChapterData(id: string): Promise<ChapterData> {
  const fullPath = path.join(chaptersDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Process content
  const html = (await import('remark-html')).default;
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    section: data.section,
    title: data.title,
    order: data.order,
    contentHtml,
    // date: data.date,
  };
}


export function getAllSectionsData(): SectionData[] {
  const files = fs.readdirSync(sectionsDirectory);

  const sections = files.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(sectionsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Process the markdown content into HTML
    //const html = (await import('remark-html')).default;
    const contentHtml = remark()
      .use(html)
      .processSync(content)
      .toString();

    return {
      id,
      title: data.title,
      order: data.order,
      contentHtml, // Include the processed HTML content
    };
  });

  // Sort sections by order
  sections.sort((a, b) => a.order - b.order);

  return sections;
}

export function getAllChaptersData(): ChapterData[] {
  const files = fs.readdirSync(chaptersDirectory);

  const chapters = files.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(chaptersDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      id,
      section: data.section,
      title: data.title,
      order: data.order,
    };
  });

  // Sort chapters by order within their sections
  chapters.sort((a, b) => {
    if (a.section === b.section) {
      return a.order - b.order;
    }
    return a.section.localeCompare(b.section);
  });

  return chapters;
}

export function getChaptersBySection(): { [key: string]: ChapterData[] } {
  const chapters = getAllChaptersData();
  const chaptersBySection: { [key: string]: ChapterData[] } = {};

  chapters.forEach((chapter) => {
    if (!chaptersBySection[chapter.section]) {
      chaptersBySection[chapter.section] = [];
    }
    chaptersBySection[chapter.section].push(chapter);
  });

  // Sort chapters within each section
  for (const sectionId in chaptersBySection) {
    chaptersBySection[sectionId].sort((a, b) => a.order - b.order);
  }

  return chaptersBySection;
}

export async function getSectionData(id: string): Promise<SectionData> {
  const fullPath = path.join(sectionsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Process content if needed
  const contentHtml = await processMarkdown(content);

  return {
    id,
    title: data.title,
    order: data.order,
    contentHtml,
  };
}

async function processMarkdown(markdownContent: string): Promise<string> {
  //const html = (await import('remark-html')).default;
  const processedContent = await remark()
    .use(html)
    .process(markdownContent);
  return processedContent.toString();
}
