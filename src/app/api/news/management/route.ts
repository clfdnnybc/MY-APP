// app/api/news/me/route.ts
import { sql } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('u');
  if (!username) return NextResponse.json([], { status: 400 });

  const { rows } = await sql`
    SELECT * FROM news
    WHERE username = ${username}
    ORDER BY date DESC
  `;
  return NextResponse.json(rows);
}