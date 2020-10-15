import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneOrder } from '../impl';
import { OrderRepo } from '../../../../typeorm/repositories';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneOrder)
export class GetOneOrderHandler
  implements IQueryHandler<GetOneOrder> {
  constructor(
    private readonly orderRepo: OrderRepo,
  ) { }

  async execute(q: GetOneOrder) {
    const { orderId } = q;

    const order = await this.orderRepo.findOne({ id: orderId });
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }
}
