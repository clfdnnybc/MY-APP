// src/types/db.ts
import { RowDataPacket } from "mysql2/promise";

export interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  // 添加其他可能的字段
  created_at?: Date;
  updated_at?: Date;
}

// mysql2 查询返回的实际类型
export type QueryResult<T extends RowDataPacket> = [T[], any];