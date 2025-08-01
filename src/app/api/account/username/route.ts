import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "userinfo",
  waitForConnections: true,
  connectionLimit: 10,
});

export async function PUT(req: NextRequest) {
  const { username, storedUsername } = await req.json(); // 接收 storedUsername
  const [existingUserRows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
  const existingUser = (existingUserRows as any[])[0];

  if (existingUser && existingUser.username !== storedUsername)
    return NextResponse.json({ message: "Username already exists" }, { status: 409 });

  try {
    await pool.query("UPDATE users SET username = ? WHERE username = ?", [username, storedUsername]);
    return NextResponse.json({ message: "Username updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update username" }, { status: 500 });
  }
}