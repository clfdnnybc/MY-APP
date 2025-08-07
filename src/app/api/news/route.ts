// app/api/news/route.ts
import { sql } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// 列表（已存在）
export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM news WHERE published = true ORDER BY date DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// 新增
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, date, published } = body;
    const { rows } = await sql`
      INSERT INTO news (title, content, date, published)
      VALUES (${title}, ${content}, ${date}, ${published})
      RETURNING id
    `;
    return NextResponse.json({ id: rows[0].id }, { status: 201 });
  } catch (err) {
    console.error('POST /api/news error:', err);
    return NextResponse.json({ message: 'Save failed' }, { status: 500 });
  }
}