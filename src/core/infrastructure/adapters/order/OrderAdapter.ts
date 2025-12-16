import type { CreateOrderDto } from '../../../application/dtos/order/CreateOrder.dto';
import type { IOrderGateway } from '../../../domain/gateways/order/IOrderGateway';
import { apiClient } from '../../api/apiClient';
import type { Response } from '../../../../shared/types/api';
import { API_SERVICES } from '../../../config/api.config';

export class OrderAdapter implements IOrderGateway {
  
  async createOrder(order: CreateOrderDto): Promise<Response<boolean>> {
    return await apiClient.post<Response<boolean>>(`${API_SERVICES.ORDERS}/Orders/CreateOrder`, order);
  }

}
