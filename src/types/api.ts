export interface User {
    id: number;
    email: string;
    name?: string;
}

export interface RegisterRequest {
    email: string;
    name?: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}

export interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    color?: string;
    price: number;
    quantity: number;
}

export interface CartItem {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    total: number;
    product: Product;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  productId: number;
  quantity: number;
}

export interface CartResponse {
    items: CartItem[];
    total: number;
}

export interface WishListItem {
    id: number;
    userId: number;
    productId: number;
    product: Product;
}

export interface MessageResponse {
  message: string;
}

export interface ErrorResponse {
    message: string;
    available?: number;
}