export interface IOrderItem {
  id?: string;
  mealId: string;
  quantity: number;
  price?: number;
  meal?: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

export interface IOrder {
  id: string;
  customerId: string;
  providerId: string;
  status: "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
  deliveryAddress: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  items: IOrderItem[];
  // Added explicit types for the joined relations
  customer?: {
    name: string;
    email: string;
  };
  provider?: {
    name: string;
  };
}

export interface ICreateOrderPayload {
  deliveryAddress: string;
  items: {
    mealId: string;
    quantity: number;
  }[];
}
