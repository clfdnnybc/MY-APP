import pool from './db';

export interface News {
  id?: number;
  title: string;
  content: string;
  date: string;
  published: boolean;
}

export const getNews = async (publishedOnly: boolean = true) => {
  const connection = await pool.getConnection();
  try {
    let query = 'SELECT * FROM news';
    if (publishedOnly) query += ' WHERE published = true';
    query += ' ORDER BY date DESC';
    
    const [rows] = await connection.query(query);
    return rows as News[];
  } finally {
    connection.release();
  }
};

export const getNewsById = async (id: number) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      'SELECT * FROM news WHERE id = ?', 
      [id]
    );
    return (rows as News[])[0];
  } finally {
    connection.release();
  }
};

export const createNews = async (news: Omit<News, 'id'>) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'INSERT INTO news (title, content, date, published) VALUES (?, ?, ?, ?)',
      [news.title, news.content, news.date, news.published]
    );
    return (result as any).insertId;
  } finally {
    connection.release();
  }
};

export const updateNews = async (id: number, news: Partial<News>) => {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      'UPDATE news SET title = ?, content = ?, published = ? WHERE id = ?',
      [news.title, news.content, news.published, id]
    );
    return true;
  } finally {
    connection.release();
  }
};

export const deleteNews = async (id: number) => {
  const connection = await pool.getConnection();
  try {
    await connection.query('DELETE FROM news WHERE id = ?', [id]);
    return true;
  } finally {
    connection.release();
  }
};