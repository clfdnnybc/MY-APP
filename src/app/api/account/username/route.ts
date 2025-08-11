import { sql } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const { username: newUsername, storedUsername } = await req.json();
    if (!newUsername || !storedUsername) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const existing = await sql`SELECT * FROM users WHERE username = ${newUsername}`;
    const found = existing.rows[0];
    if (found && found.username !== storedUsername) {
      return NextResponse.json({ message: 'Username already taken' }, { status: 409 });
    }

    await sql`UPDATE users SET username = ${newUsername} WHERE username = ${storedUsername}`;
    await sql`UPDATE news SET username = ${newUsername} WHERE username = ${storedUsername}`;
    return NextResponse.json({ message: 'Username updated successfully' });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: `Username update failed: ${msg}` }, { status: 500 });
  }
}