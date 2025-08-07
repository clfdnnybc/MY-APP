// app/api/news/[id]/route.ts
import { sql } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    await sql`DELETE FROM news WHERE id = ${id}`;
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
  }
}