
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrder } from '../impl';
import { ProductRepo, OrderRepo } from '../../../../typeorm/repositories';
import { BadRequestException } from '@nestjs/common';
import { In } from 'typeorm';

@CommandHandler(UpdateOrder)
export class UpdateOrderHandler
  implements ICommandHandler<UpdateOrder> {
  constructor(
    private readonly productRepo: ProductRepo,
    private readonly orderRepo: OrderRepo,
  ) { }

  async execute(c: UpdateOrder) {
    const { orderId, body } = c;
    const { order_type, order_status, products, quantity, total_price } = body;

    const numberOfProduct = await this.productRepo.count({ product_code: In(products) });
    if (numberOfProduct !== products.length) {
      throw new BadRequestException();
    }
    await this.orderRepo.update({ id: orderId }, { order_type, order_status, products, quantity, total_price });
  }
}
