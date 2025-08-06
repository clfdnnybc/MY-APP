// src/types/db.ts
import { RowDataPacket, FieldPacket } from "mysql2/promise";

export interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

// 使用精确的 FieldPacket 类型替代 any
export type QueryResult<T extends RowDataPacket> = [T[], FieldPacket[]];