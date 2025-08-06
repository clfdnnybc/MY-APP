import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { User } from "@/types/db";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "userinfo",
  waitForConnections: true,
  connectionLimit: 10,
});

export async function PUT(req: NextRequest) {
  try {
    const { oldPassword, newPassword, storedUsername } = await req.json();
    
    if (!storedUsername || !oldPassword || !newPassword) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 类型安全的查询
    const [rows] = await pool.query<User[]>(
      "SELECT * FROM users WHERE username = ?",
      [storedUsername]
    );
    
    const user = rows[0];

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // 验证旧密码
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid current password" },
        { status: 401 }
      );
    }

    // 更新密码
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await pool.execute(
      "UPDATE users SET password = ? WHERE username = ?",
      [hashedPassword, storedUsername]
    );

    return NextResponse.json(
      { message: "Password updated successfully" }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: `Password update failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}