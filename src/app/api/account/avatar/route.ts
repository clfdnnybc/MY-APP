// app/api/account/avatar/route.ts
import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    const { username, avatar } = await req.json();
    await sql`
      UPDATE users
      SET avatar = ${avatar}
      WHERE username = ${username}
    `;
    return NextResponse.json({ message: 'Avatar updated successfully' });
  } catch (err) {
    console.error('Error updating avatar:', err);
    return NextResponse.json({ message: 'Failed to update avatar' }, { status: 500 });
  }
}