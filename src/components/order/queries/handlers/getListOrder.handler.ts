import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetListOrder } from '../impl';
import { OrderRepo } from '../../../../typeorm/repositories';
import { Order } from '../../../../typeorm/entities';
import { FindConditions } from 'typeorm';
import { PaginationResponse } from 'src/common/dtos';

@QueryHandler(GetListOrder)
export class GetListOrderHandler
  implements IQueryHandler<GetListOrder> {
  constructor(
    private readonly orderRepo: OrderRepo,
  ) { }

  async execute(q: GetListOrder) {
    const { query, pagination } = q;
    const { order_id, order_code, order_type, order_status } = query;
    const condition: FindConditions<Order> = {};
    if (order_id) {
      condition.id = order_id;
    }
    if (order_code) {
      condition.order_code = order_code;
    }
    if (order_type) {
      condition.order_type = order_type;
    }
    if (order_status) {
      condition.order_status = order_status;
    }

    const [orders, count] = await this.orderRepo.findAndCount({
      where: condition,
      skip: pagination.offset,
      take: pagination.limit,
      order: { id: 'DESC' },
    });
    return new PaginationResponse(orders, count);
  }
}
