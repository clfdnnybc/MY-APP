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

    // 类型安全的查询
    const existingUsers = await query<UserField<'username'>>(
      "SELECT username FROM users WHERE username = ?",
      [newUsername]
    );
    
    if (existingUsers.length > 0 && existingUsers[0].username !== storedUsername) {
      return NextResponse.json(
        { message: "Username already taken by another user" }, // 更明确的错误消息
        { status: 409 }
      );
    }

    // 使用事务确保数据一致性
    await query(
      "UPDATE users SET username = ? WHERE username = ?",
      [newUsername, storedUsername]
    );

    return NextResponse.json(
      { 
        message: "Username updated successfully",
        newUsername // 返回新用户名以便客户端更新
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorCode = error instanceof Error && 'code' in error ? error.code : undefined;
    return NextResponse.json(
      { 
        message: "Username update failed: " + (errorMessage || "Database error"),
        code: errorCode // 传递数据库错误代码
      },
      { status: 500 }
    );
  }
}