import { useState, useEffect, useMemo, useCallback } from 'react';
import { OrderService } from '../../../../core/application/services/Order/OrderService';
import { OrderAdapter } from '../../../../core/infrastructure/adapters/order/OrderAdapter';
import type { GetMyOrderDto as OrderDto } from '../../../../core/application/dtos/order/GetMyOrder.dto';
import type { LoadingState } from '../../../../shared/types/common';

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
      const data = await orderService.getMyOrders(1); // TODO: Replace with real user ID
      if (data.success && data.data) {
        setOrders(data.data);
      }
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
