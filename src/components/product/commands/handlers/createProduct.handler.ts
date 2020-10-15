
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProduct } from '../impl';
import { ProductRepo } from '../../../../typeorm/repositories';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateProduct)
export class CreateProductHandler
  implements ICommandHandler<CreateProduct> {
  constructor(
    private readonly productRepo: ProductRepo,
  ) { }

  async execute(c: CreateProduct) {
    const { body } = c;
    const { product_name, product_code, price } = body;

    try {
      await this.productRepo.createQueryBuilder().insert()
        .values({ product_name, product_code, price })
        .updateEntity(false).execute();
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException();
      }
      throw error;
    }
  }
}
