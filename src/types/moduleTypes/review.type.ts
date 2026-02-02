export interface IReview {
  id: string;
  mealId: string;
  userId: string; // Adjusted from customerId based on your JSON
  rating: number;
  comment: string;
  isHidden: boolean; // Added per backend response
  createdAt: string;
  meal?: {
    name: string;
    imageUrl: string;
  };
}

export interface ICreateReviewPayload {
  mealId: string;
  rating: number;
  comment: string;
}

export interface IReviewResponse {
  success: boolean;
  message: string;
  data: IReview;
}
