import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "userinfo",
  waitForConnections: true,
  connectionLimit: 10,
});

export async function PUT(req: NextRequest) {
  const { oldPassword, newPassword, storedUsername } = await req.json(); // 接收 storedUsername
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [storedUsername]);
  const user = (rows as any[])[0];

  if (!user || !(await bcrypt.compare(oldPassword, user.password)))
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await pool.query("UPDATE users SET password = ? WHERE username = ?", [hashedPassword, storedUsername]);
    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update password" }, { status: 500 });
  }
}