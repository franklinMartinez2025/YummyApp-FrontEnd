import type { OrderDto, CreateOrderDto, OrderStatusDto } from '../../application/dtos/order/OrderDto';
export interface IOrderGateway {

  getOrderById(id: string): Promise<OrderDto | null>;

  getUserOrders(): Promise<OrderDto[]>;

  createOrder(order: CreateOrderDto): Promise<OrderDto>;

  updateOrderStatus(orderId: string, status: OrderStatusDto): Promise<OrderDto>;

  cancelOrder(orderId: string): Promise<OrderDto>;
}

