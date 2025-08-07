import { sql } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const { oldPassword, newPassword, storedUsername } = await req.json();
    if (!storedUsername || !oldPassword || !newPassword) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const result = await sql`SELECT * FROM users WHERE username = ${storedUsername}`;
    const user = result.rows[0];
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) {
      return NextResponse.json({ message: 'Invalid current password' }, { status: 401 });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await sql`UPDATE users SET password = ${hashed} WHERE username = ${storedUsername}`;

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: `Password update failed: ${msg}` }, { status: 500 });
  }
}