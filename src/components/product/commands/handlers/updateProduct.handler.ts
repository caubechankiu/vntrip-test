
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProduct } from '../impl';
import { ProductRepo } from '../../../../typeorm/repositories';

@CommandHandler(UpdateProduct)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProduct> {
  constructor(
    private readonly productRepo: ProductRepo,
  ) { }

  async execute(c: UpdateProduct) {
    const { productId, body } = c;
    const { product_name, price } = body;

    await this.productRepo.update({ id: productId }, { product_name, price });
  }
}
