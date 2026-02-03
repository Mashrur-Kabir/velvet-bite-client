export interface ICategory {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryResponse {
  success: boolean;
  message: string;
  data: ICategory[];
}

export interface ICategoryUpdatePayload {
  name: string;
}

export interface ICategorySingleResponse {
  success: boolean;
  message: string;
  data: ICategory;
}
