import type { IOrderGateway } from '../../../domain/gateways/order/IOrderGateway';
import type { CreateOrderDto } from '../../dtos/order/CreateOrder.dto';
import type { Response } from '../../../../shared/types/api';
import type { GetMyOrderDto } from '../../dtos/order/GetMyOrder.dto';

export class OrderService {
  private orderGateway: IOrderGateway;

  constructor(orderGateway: IOrderGateway) {
    this.orderGateway = orderGateway;
  }

  async createOrder(order: CreateOrderDto): Promise<Response<boolean>> {
    return await this.orderGateway.createOrder(order);
  }

  async getMyOrders(userId: number): Promise<Response<GetMyOrderDto[]>> {
    return await this.orderGateway.getMyOrders(userId);
  }


}
