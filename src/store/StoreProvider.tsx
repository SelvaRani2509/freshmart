import React, { useEffect, useState } from 'react';
import {
  CartItem,
  Category,
  DeliveryPerson,
  Order,
  OrderStatus,
  Product,
  Review,
} from '../types';
import { api } from '../services/api';

export interface StoreState {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  orders: Order[];
  deliveryPersons: DeliveryPerson[];
  reviews: Review[];
  loading: boolean;
}

export interface StoreContextType extends StoreState {
  addToCart: (productId: string, quantity: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  placeOrder: (payload: { customerName: string; phone: string; address: string }) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  assignDelivery: (orderId: string, deliveryPersonId: string) => void;
  addReview: (orderId: string, productId: string, rating: number, comment: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (productId: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
}

const STORE_KEY = 'freshmart_cart'; // Only storing cart locally now

const StoreContext = React.createContext<StoreContextType | undefined>(undefined);

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<StoreState>({
    products: [],
    categories: [],
    cart: [],
    orders: [],
    deliveryPersons: [],
    reviews: [],
    loading: true,
  });

  // Load Cart from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem(STORE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setState(prev => ({ ...prev, cart: parsedCart }));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(state.cart));
  }, [state.cart]);

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, categories, deliveryPersons, orders] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
          api.getDeliveryPersons(),
          api.getOrders(),
        ]);

        setState(prev => ({
          ...prev,
          products,
          categories: categories as Category[], // Assuming API returns matching strings
          deliveryPersons,
          orders,
          loading: false
        }));
      } catch (error) {
        console.error('Failed to load data:', error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  const addToCart = (productId: string, quantity: number) => {
    setState((prev) => {
      const existing = prev.cart.find((c) => c.productId === productId);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map((c) =>
            c.productId === productId ? { ...c, quantity: c.quantity + quantity } : c
          ),
        };
      }
      return { ...prev, cart: [...prev.cart, { productId, quantity }] };
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart
        .map((c) => (c.productId === productId ? { ...c, quantity } : c))
        .filter((c) => c.quantity > 0),
    }));
  };

  const removeFromCart = (productId: string) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((c) => c.productId !== productId),
    }));
  };

  const clearCart = () => {
    setState((prev) => ({ ...prev, cart: [] }));
  };

  const placeOrder = async (payload: { customerName: string; phone: string; address: string }): Promise<Order | null> => {
    if (state.cart.length === 0) return null;

    // Calculate total from current products state (which matches DB)
    const total = state.cart.reduce((acc, item) => {
      const prod = state.products.find((p) => p.id === item.productId);
      if (!prod) return acc;
      return acc + prod.price * item.quantity;
    }, 0);

    const newOrderPayload: any = {
      // JSON Server constructs ID automatically if not provided, but we can provide one if we want specific format
      customerName: payload.customerName,
      phone: payload.phone,
      address: payload.address,
      items: state.cart,
      total,
      status: 'Order Placed',
      placedAt: new Date().toISOString(),
    };

    try {
      const createdOrder = await api.addOrder(newOrderPayload);

      setState((prev) => ({
        ...prev,
        orders: [createdOrder, ...prev.orders],
        cart: [],
      }));

      return createdOrder;
    } catch (e) {
      console.error("Failed to place order", e);
      return null;
    }
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    // In a real app, we would call API here too
    // For now, updating local state. To be persistent, should add api.updateOrder
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.id === orderId
          ? {
            ...o,
            status,
            deliveredAt: status === 'Delivered' ? new Date().toISOString() : o.deliveredAt,
          }
          : o
      ),
    }));
  };

  const assignDelivery = (orderId: string, deliveryPersonId: string) => {
    // TODO: API call
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.id === orderId ? { ...o, assignedTo: deliveryPersonId } : o
      ),
    }));
  };

  const addReview = (orderId: string, productId: string, rating: number, comment: string) => {
    // TODO: API call (need reviews endpoint)
    const newReview: Review = {
      id: `R-${Date.now().toString().slice(-6)}`,
      orderId,
      productId,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({ ...prev, reviews: [newReview, ...prev.reviews] }));
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      // cast to Product as ID is generated by server
      const added = await api.addProduct(product as Product);
      setState((prev) => ({ ...prev, products: [...prev.products, added] }));
    } catch (e) {
      console.error("Failed to add product", e);
    }
  };

  const updateProduct = async (productId: string, updates: Partial<Product>) => {
    // TODO: Implement api.updateProduct
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === productId ? { ...p, ...updates } : p)),
    }));
  };

  const deleteProduct = async (productId: string) => {
    try {
      await api.deleteProduct(productId);
      setState((prev) => ({
        ...prev,
        products: prev.products.filter((p) => p.id !== productId),
        cart: prev.cart.filter((c) => c.productId !== productId),
      }));
    } catch (e) {
      console.error("Failed to delete product", e);
    }
  };

  const value: StoreContextType = {
    ...state,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
    updateOrderStatus,
    assignDelivery,
    addReview,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = React.useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return ctx;
};

export default StoreProvider;
