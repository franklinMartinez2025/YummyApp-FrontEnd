import { useState, useEffect, useMemo, useCallback } from 'react';
import { OrderService } from '../../../core/application/services/OrderService';
import { OrderAdapter } from '../../../core/infrastructure/adapters/OrderAdapter';
import type { OrderDto } from '../../../core/application/dtos/order/OrderDto';
import type { LoadingState } from '../../../shared/types';

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const orderService = useMemo(() => {
    const orderAdapter = new OrderAdapter();
    return new OrderService(orderAdapter);
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoadingState('loading');
    try {
      const data = await orderService.getUserOrders();
      setOrders(data);
      setLoadingState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching orders');
      setLoadingState('error');
    }
  }, [orderService]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loadingState,
    error,
    refetch: fetchOrders
  };
};
