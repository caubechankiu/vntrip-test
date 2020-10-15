import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneProduct } from '../impl';
import { ProductRepo } from '../../../../typeorm/repositories';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneProduct)
export class GetOneProductHandler
  implements IQueryHandler<GetOneProduct> {
  constructor(
    private readonly productRepo: ProductRepo,
  ) { }

  async execute(q: GetOneProduct) {
    const { productId } = q;

    const product = await this.productRepo.findOne({ id: productId });
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }
}
