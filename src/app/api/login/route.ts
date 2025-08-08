import { sql } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('POSTGRES_URL=', process.env.POSTGRES_URL);
  const { username, password, mode } = await req.json();

  const result = await sql`SELECT * FROM users WHERE username = ${username}`;
  const user = result.rows[0];

  if (mode === 'signup') {
    if (user) {
      return NextResponse.json({ message: 'User exists' }, { status: 409 });
    }
    const hashed = await bcrypt.hash(password, 12);
    await sql`INSERT INTO users (username, password) VALUES (${username}, ${hashed})`;
    return NextResponse.json({ message: 'Registered' });
  }

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({
    message: 'Login success',
    avatar: user.avatar || '/avatar.ico', // 兜底默认
  });
}

export async function GET() {
  try {
    const rows = await sql`SELECT * FROM users WHERE username = `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

