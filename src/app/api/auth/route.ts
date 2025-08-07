import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";
import type { UserField } from '@/types/db';

export async function POST(req: NextRequest) {
  try {
    const { username, password, mode } = await req.json(); 
    
    // 增强输入验证
    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }
    // 精确查询只返回必要字段
    const users = await query<UserField<'id' | 'password'>>(
      "SELECT id, password FROM users WHERE username = ? LIMIT 1",
      [username]
    );
    const user = users[0];
    if (mode === "signup") {
      if (user) {
        return NextResponse.json(
          { message: "Username already registered" },
          { status: 409 }
        );
      }
      
      // 密码强度验证
      if (password.length < 8) {
        return NextResponse.json(
          { message: "Password must be at least 8 characters" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword]
      );
      
      return NextResponse.json(
        { 
          message: "Registration successful",
          username // 返回注册成功的用户名
        }
      );
    }

    // 登录逻辑
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid username or password" }, // 模糊化错误信息
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      message: "Login successful",
      userId: user.id // 返回用户ID供客户端使用
    });
  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      
      {
        message: "Authentication failed",
        detail: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}