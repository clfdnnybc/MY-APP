import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";
import type { UserField } from '@/types/db';

export async function PUT(req: NextRequest) {
  try {
    const { oldPassword, newPassword, storedUsername } = await req.json();
    
    // 增强输入验证
    if (!oldPassword || !newPassword || !storedUsername) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // 精确查询只返回必要字段
    const users = await query<UserField<'password'>>(
      "SELECT password FROM users WHERE username = ? LIMIT 1",
      [storedUsername]
    );
    const user = users[0];

    if (!user) {
      return NextResponse.json(
        { message: "Account not found" }, // 避免暴露用户存在信息
        { status: 404 }
      );
    }

    // 密码验证
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Current password is incorrect" }, // 更友好的错误消息
        { status: 401 }
      );
    }

    // 更新密码
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await query(
      "UPDATE users SET password = ? WHERE username = ?",
      [hashedPassword, storedUsername]
    );

    return NextResponse.json(
      { 
        message: "Password updated successfully",
        updatedAt: new Date().toISOString() // 返回更新时间
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      
      { 
        message: "Password update failed",
        detail: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}