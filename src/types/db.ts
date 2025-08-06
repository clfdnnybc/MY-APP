import { RowDataPacket, FieldPacket } from 'mysql2';

// 扩展 RowDataPacket 类型
declare module 'mysql2' {
  interface RowDataPacket {
    constructor: {
      name: 'RowDataPacket';
    };
  }
}

// 用户类型定义
export interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
}

// 创建完整的类型工具
export type UserField<K extends keyof User> = Pick<User, K> & RowDataPacket;