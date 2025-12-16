import { useState } from "react";
import type { CreateOrderDto } from "../../../../core/application/dtos/order/CreateOrder.dto";
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

  return {
    createOrder,
    resetOrder,
    loadingState,
    error,
    orderId,
  };
};
