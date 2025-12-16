import type { Response } from "../../../../shared/types/api";
import type { CreateOrderDto } from "../../../application/dtos/order/CreateOrder.dto";


export interface IOrderGateway {

  createOrder(order: CreateOrderDto): Promise<Response<boolean>>;
  
}

