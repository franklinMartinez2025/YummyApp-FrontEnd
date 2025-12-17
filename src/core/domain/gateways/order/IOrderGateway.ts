import type { Response } from "../../../../shared/types/api";
import type { CreateOrderDto } from "../../../application/dtos/order/CreateOrder.dto";
import type { GetMyOrderDto } from "../../../application/dtos/order/GetMyOrder.dto";


export interface IOrderGateway { 

  createOrder(order: CreateOrderDto): Promise<Response<boolean>>;

  getMyOrders(userId: number): Promise<Response<GetMyOrderDto[]>>;
  
}

