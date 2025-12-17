import { useState, useEffect, useMemo, useCallback } from 'react';
import { CartService } from '../../../../core/application/services/Cart/CartService';
import { CartAdapter } from '../../../../core/infrastructure/adapters/cart/CartAdapter';
import type { CartDto } from '../../../../core/application/dtos/cart/CartDto';
import type { LoadingState } from '../../../../shared/types/common';

export const useCart = () => {
  const [cart /*, setCart */] = useState<CartDto | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const cartService = useMemo(() => {
    const cartAdapter = new CartAdapter();
    return new CartService(cartAdapter);
  }, []);

  const fetchCart = useCallback(async () => {
    setLoadingState('loading');
    try {
      // const data = await cartService.getCart();
      // setCart(data);
      console.log('Fetching cart not implemented fully');
      setLoadingState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching cart');
      setLoadingState('error');
    }
  }, [cartService]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = async (_productId: string, _quantity: number, _specialInstructions?: string) => {
    try {
      // const updatedCart = await cartService.addItemToCart({ productId, quantity, specialInstructions });
      // setCart(updatedCart);
      console.log('addItem not implemented');
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const updateQuantity = async (_productId: string, _quantity: number) => {
    try {
      // const updatedCart = await cartService.updateCartItem(productId, { quantity });
      // setCart(updatedCart);
      console.log('updateQuantity not implemented');
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const removeItem = async (_productId: string) => {
    try {
      // const updatedCart = await cartService.removeItemFromCart(productId);
      // setCart(updatedCart);
      console.log('removeItem not implemented');
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
