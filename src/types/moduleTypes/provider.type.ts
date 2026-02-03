import { IMeal } from "./meal.type";

export interface IProvider {
  id: string;
  userId: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  meals?: IMeal[]; // Added to support the /api/providers/me response
}

export interface IProviderResponse {
  success: boolean;
  message: string;
  data: IProvider[];
}

export interface ICreateProviderPayload {
  name: string;
  description: string;
  address: string;
  phone: string;
}
