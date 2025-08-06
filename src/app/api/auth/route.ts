import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { User } from "@/types/db";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",  
  database: "userinfo",
  waitForConnections: true,
  connectionLimit: 10,
});

export async function POST(req: NextRequest) {
  const { username, password, mode } = await req.json();
  
  // 使用正确的类型声明
  const [rows] = await pool.query<User[]>(
    "SELECT * FROM users WHERE username = ?", 
    [username]
  );
  
  // 现在 rows 是 User[] 类型
  const user = rows[0];

  if (mode === "signup") {
    if (user) {
      return NextResponse.json(
        { message: "User exists" }, 
        { status: 409 }
      );
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    await pool.execute(
      "INSERT INTO users (username, password) VALUES (?, ?)", 
      [username, hashedPassword]
    );
    
    return NextResponse.json({ message: "Registered" });
  }

  // 现在可以安全访问 user.password
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: "Invalid credentials" }, 
      { status: 401 }
    );
  }
  
  return NextResponse.json({ message: "Login success" });
}