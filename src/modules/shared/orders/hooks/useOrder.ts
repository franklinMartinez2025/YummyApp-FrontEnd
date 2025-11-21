import { useState } from "react";
import type { CreateOrderDto } from "../../../core/application/dtos/order/CreateOrderDto";
import type { LoadingState } from "../../../shared/types";

export const useOrder = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const createOrder = async (orderData: CreateOrderDto) => {
    setLoadingState("loading");
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success
      const mockOrderId = `ORD-${Date.now()}`;
      setOrderId(mockOrderId);
      setLoadingState("success");

      console.log("Order created:", { id: mockOrderId, ...orderData });
      return mockOrderId;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al procesar la orden";
      setError(errorMessage);
      setLoadingState("error");
      return null;
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
