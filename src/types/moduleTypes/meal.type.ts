export interface IMeal {
  id: string;
  providerId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    name: string;
  };
  provider: {
    name: string;
  };
  _count: {
    reviews: number;
  };
  avgRating: number;
  totalReviews: number;
}

export interface IMealFilter {
  search?: string;
  categoryId?: string;
  providerId?: string;
  isAvailable?: boolean;
  limit?: number;
  page?: number; // Frontend typically uses 'page'
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IMealResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: IMeal[];
}
