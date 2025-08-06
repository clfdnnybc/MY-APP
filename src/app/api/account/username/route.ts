import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { User } from "@/types/db";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "userinfo",
  waitForConnections: true,
  connectionLimit: 10,
});

export async function PUT(req: NextRequest) {
  try {
    const { username: newUsername, storedUsername } = await req.json();
    
    if (!newUsername || !storedUsername) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 检查用户名是否已存在
    const [existingRows] = await pool.query<User[]>(
      "SELECT * FROM users WHERE username = ?",
      [newUsername]
    );
    
    const existingUser = existingRows[0];

    // 如果用户名已存在且不是当前用户
    if (existingUser && existingUser.username !== storedUsername) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 409 }
      );
    }

    // 更新用户名
    await pool.execute(
      "UPDATE users SET username = ? WHERE username = ?",
      [newUsername, storedUsername]
    );

    return NextResponse.json(
      { message: "Username updated successfully" }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: `Username update failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}