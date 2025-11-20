import type { IOrderGateway } from '../../domain/gateways/IOrderGateway';
import type { OrderDto, CreateOrderDto, OrderStatusDto } from '../../application/dtos/order/OrderDto';
import { apiClient } from '../api/apiClient';

export class OrderAdapter implements IOrderGateway {
  async getOrderById(id: string): Promise<OrderDto | null> {
    try {
      return await apiClient.get<OrderDto>(`/orders/${id}`);
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  }

  async getUserOrders(): Promise<OrderDto[]> {
    try {
      return await apiClient.get<OrderDto[]>('/orders');
    } catch (error) {
      console.error('Error fetching user orders:', error);
      return [];
    }
  }

  async createOrder(order: CreateOrderDto): Promise<OrderDto> {
    return await apiClient.post<OrderDto>('/orders', order);
  }

  async updateOrderStatus(orderId: string, status: OrderStatusDto): Promise<OrderDto> {
    return await apiClient.put<OrderDto>(`/orders/${orderId}/status`, { status });
  }

  async cancelOrder(orderId: string): Promise<OrderDto> {
    return await apiClient.post<OrderDto>(`/orders/${orderId}/cancel`, {});
  }
}

