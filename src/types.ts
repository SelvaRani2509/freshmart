export type Category =
  | 'Fresh Vegetables'
  | 'Fruits'
  | 'Groceries & Staples'
  | 'Snacks & Beverages'
  | 'Household Essentials';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  rating: number;
  description: string;
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: Array<{ productId: string; quantity: number }>;
  total: number;
  status: OrderStatus;
  assignedTo?: string;
  placedAt: string;
  deliveredAt?: string;
}

export interface DeliveryPerson {
  id: string;
  name: string;
  phone: string;
}

export interface Review {
  id: string;
  orderId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}



