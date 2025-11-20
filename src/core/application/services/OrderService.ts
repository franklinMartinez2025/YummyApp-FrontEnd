import type { IOrderGateway } from '../../domain/gateways/IOrderGateway';
import type { OrderDto, CreateOrderDto, OrderStatusDto } from '../dtos/order/OrderDto';

/**
 * Servicio de aplicación para órdenes
 * Orquesta la comunicación con el gateway de órdenes
 */
export class OrderService {
  private orderGateway: IOrderGateway;

  constructor(orderGateway: IOrderGateway) {
    this.orderGateway = orderGateway;
  }

  async getOrderById(id: string): Promise<OrderDto | null> {
    return await this.orderGateway.getOrderById(id);
  }

  async getUserOrders(): Promise<OrderDto[]> {
    return await this.orderGateway.getUserOrders();
  }

  async createOrder(order: CreateOrderDto): Promise<OrderDto> {
    return await this.orderGateway.createOrder(order);
  }

  async updateOrderStatus(orderId: string, status: OrderStatusDto): Promise<OrderDto> {
    return await this.orderGateway.updateOrderStatus(orderId, status);
  }

  async cancelOrder(orderId: string): Promise<OrderDto> {
    return await this.orderGateway.cancelOrder(orderId);
  }
}
