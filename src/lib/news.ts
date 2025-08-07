// lib/news.ts
import { sql } from '@/lib/db';

export interface News {
  id?: number;
  title: string;
  content: string;
  date: string;
  published: boolean;
}

export const getNews = async (publishedOnly = true) => {
  const { rows } = publishedOnly
    ? await sql`SELECT * FROM news WHERE published = true ORDER BY date DESC`
    : await sql`SELECT * FROM news ORDER BY date DESC`;
  return rows as News[];
};

export const getNewsById = async (id: number) => {
  const { rows } = await sql`SELECT * FROM news WHERE id = ${id}`;
  return rows[0] as News | undefined;
};

export const createNews = async (news: Omit<News, 'id'>) => {
  const { rows } = await sql`
    INSERT INTO news (title, content, date, published)
    VALUES (${news.title}, ${news.content}, ${news.date}, ${news.published})
    RETURNING id
  `;
  return rows[0].id as number;
};

export const updateNews = async (id: number, news: Partial<News>) => {
  await sql`
    UPDATE news
    SET title = ${news.title}, content = ${news.content}, published = ${news.published}
    WHERE id = ${id}
  `;
  return true;
};

export const deleteNews = async (id: number) => {
  await sql`DELETE FROM news WHERE id = ${id}`;
  return true;
};