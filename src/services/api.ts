import { Product, Category, Order, DeliveryPerson } from '../types';

const API_URL = '/api';

export const api = {
    // Users
    async getUsers(): Promise<any[]> {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
    },

    // Products
    async getProducts(): Promise<Product[]> {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
    },

    async getProduct(id: string): Promise<Product> {
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        return response.json();
    },

    async addProduct(product: Product): Promise<Product> {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        if (!response.ok) throw new Error('Failed to add product');
        return response.json();
    },

    async deleteProduct(id: string): Promise<void> {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete product');
    },

    // Categories
    async getCategories(): Promise<Category[]> {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        return data.map((c: any) => c.name);
    },

    // Delivery Persons
    async getDeliveryPersons(): Promise<DeliveryPerson[]> {
        const response = await fetch(`${API_URL}/deliveryPersons`);
        if (!response.ok) throw new Error('Failed to fetch delivery persons');
        return response.json();
    },

    // Orders
    async getOrders(): Promise<Order[]> {
        const response = await fetch(`${API_URL}/orders`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        return response.json();
    },

    async addOrder(order: Order): Promise<Order> {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
        });
        if (!response.ok) throw new Error('Failed to create order');
        return response.json();
    },
};
