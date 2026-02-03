import { IUser } from "./user.type";

export interface IAdminUpdatePayload {
  name?: string;
  phone?: string | null;
  image?: string | null;
}

export interface IAllUsersResponse {
  success: boolean;
  message: string;
  data: IUser[];
}

export interface IReviewVisibilityPayload {
  isHidden: boolean;
}
