
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrder } from '../impl';
import { ProductRepo, OrderRepo } from '../../../../typeorm/repositories';
import { BadRequestException } from '@nestjs/common';
import { In } from 'typeorm';

@CommandHandler(CreateOrder)
export class CreateOrderHandler
  implements ICommandHandler<CreateOrder> {
  constructor(
    private readonly productRepo: ProductRepo,
    private readonly orderRepo: OrderRepo,
  ) { }

  async execute(c: CreateOrder) {
    const { body } = c;
    const { order_code, order_type, order_status, products, quantity, total_price } = body;

    const numberOfProduct = await this.productRepo.count({ product_code: In(products) });
    if (numberOfProduct !== products.length) {
      throw new BadRequestException();
    }
    try {
      await this.orderRepo.createQueryBuilder().insert()
        .values({ order_code, order_type, order_status, products, quantity, total_price })
        .updateEntity(false).execute();
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException();
      }
      throw error;
    }
  }
}
