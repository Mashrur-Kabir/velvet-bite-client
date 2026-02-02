// 1. Enum to match your Prisma backend update
export type TUserStatus = "ACTIVE" | "BLOCKED" | "PENDING";

// 2. The Core User Interface
export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  phone: string | null;
  status: TUserStatus | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  _count?: {
    orders: number;
    reviews: number;
  };
}

// 3. The Better-Auth Session Interface
export interface ISession {
  id: string;
  token: string;
  userId: string;
  expiresAt: string | Date;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// 4. The Unified Response Structure
export interface IUserSessionResponse {
  user: IUser;
  session: ISession;
}
