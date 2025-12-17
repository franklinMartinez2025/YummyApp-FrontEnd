import { useState } from "react";
import type { CreateOrderDto } from "../../../../core/application/dtos/order/CreateOrder.dto";
import type { GetMyOrderDto } from "../../../../core/application/dtos/order/GetMyOrder.dto";
import { OrderService } from "../../../../core/application/services/Order/OrderService";
import { OrderAdapter } from "../../../../core/infrastructure/adapters/order/OrderAdapter";
import type { ApiStatus as LoadingState } from "../../../../shared/types/common";

export const useOrder = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const orderService = new OrderService(new OrderAdapter());

  const createOrder = async (orderData: CreateOrderDto) => {
    setLoadingState("loading");
    setError(null);

    try {
      const response = await orderService.createOrder(orderData);
      
      // Soporte para backend que devuelve 'succeeded' en lugar de 'success'
      if (response.success) {
        const createdOrderId = "confirmed"; 
        setOrderId(createdOrderId);
        setLoadingState("success");
        return true;
      } else {
         throw new Error(response.message || "Error al crear la orden");
      }
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al procesar la orden";
      setError(errorMessage);
      setLoadingState("error");
      return false;
    }
  };

  const resetOrder = () => {
    setLoadingState("idle");
    setError(null);
    setOrderId(null);
  };

  const [myOrders, setMyOrders] = useState<GetMyOrderDto[]>([]);

  const fetchMyOrders = async (userId: number) => {
    setLoadingState("loading");
    try {
        const response = await orderService.getMyOrders(userId);
        if (response.success && response.data) {
            setMyOrders(response.data);
            setLoadingState("success");
            return response.data;
        } else {
             setLoadingState("error");
             return [];
        }
    } catch (e) {
        setLoadingState("error");
        return [];
    }
  };

  return {
    createOrder,
    fetchMyOrders,
    myOrders,
    resetOrder,
    loadingState,
    error,
    orderId,
  };
};
