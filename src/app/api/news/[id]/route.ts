// app/api/news/[id]/route.ts
import { sql } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// 删除（已存在）
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await sql`DELETE FROM news WHERE id = ${Number(id)}`;
    return NextResponse.json({ message: 'Deleted' });
  } catch (err) {
    console.error('DELETE /api/news/[id] error:', err);
    return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
  }
}

// 更新
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, content, date, published, username, avatar  } = body;
    await sql`
      UPDATE news
      SET title = ${title},
          content = ${content},
          date = ${date},
          published = ${published},
          username = ${username},
          avatar = ${avatar}
      WHERE id = ${Number(id)}
    `;
    return NextResponse.json({ message: 'Updated' });
  } catch (err) {
    console.error('PUT /api/news/[id] error:', err);
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { rows } = await sql`SELECT * FROM news WHERE id = ${Number(id)}`;
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}