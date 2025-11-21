import { useState, useEffect, useMemo, useCallback } from 'react';
import { CartService } from '../../../core/application/services/CartService';
import { CartAdapter } from '../../../core/infrastructure/adapters/CartAdapter';
import type { CartDto } from '../../../core/application/dtos/cart/CartDto';
import type { LoadingState } from '../../../shared/types';

export const useCart = () => {
  const [cart, setCart] = useState<CartDto | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const cartService = useMemo(() => {
    const cartAdapter = new CartAdapter();
    return new CartService(cartAdapter);
  }, []);

  const fetchCart = useCallback(async () => {
    setLoadingState('loading');
    try {
      const data = await cartService.getCart();
      setCart(data);
      setLoadingState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching cart');
      setLoadingState('error');
    }
  }, [cartService]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = async (productId: string, quantity: number, specialInstructions?: string) => {
    try {
      const updatedCart = await cartService.addItemToCart({ productId, quantity, specialInstructions });
      setCart(updatedCart);
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const updatedCart = await cartService.updateCartItem(productId, { quantity });
      setCart(updatedCart);
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const updatedCart = await cartService.removeItemFromCart(productId);
      setCart(updatedCart);
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  return {
    cart,
    loadingState,
    error,
    addItem,
    updateQuantity,
    removeItem,
    refetch: fetchCart
  };
};
