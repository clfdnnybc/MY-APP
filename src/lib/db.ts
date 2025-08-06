import mysql from 'serverless-mysql';
import type { RowDataPacket } from 'mysql2';
import type { User } from '@/types/db';

const db = mysql({
  config: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: true
    } : undefined,
    connectTimeout: 5000
  }
});

export async function query<T extends RowDataPacket>(
  sql: string,
  values?: any
): Promise<T[]> {
  try {
    const results = await db.query<T[]>(sql, values);
    await db.end();
    return results;
  } catch (error) {
    await db.end();
    throw error;
  }
}

export default db;