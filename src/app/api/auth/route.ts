import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const pool = mysql.createPool({
  host:     "localhost",
  user:     "root",
  password: "",  
  database: "userinfo",
  waitForConnections: true,
  connectionLimit: 10,
});

export async function POST(req: NextRequest) {
  const { username, password, mode } = await req.json();
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
  const user = (rows as any[])[0];

  if (mode === "signup") {
    if (user) return NextResponse.json({ message: "User exists" }, { status: 409 });
    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, await bcrypt.hash(password, 12)]);
    return NextResponse.json({ message: "Registered" });
  }

  if (!user || !(await bcrypt.compare(password, user.password)))
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  return NextResponse.json({ message: "Login success" });
}