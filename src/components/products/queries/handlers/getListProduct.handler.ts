import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '../../../../common/dtos';
import { FindConditions, Like } from 'typeorm';
import { GetListProduct } from '../impl';
import { ProductRepo } from '../../../../typeorm/repositories';
import { Product } from '../../../../typeorm/entities';

@QueryHandler(GetListProduct)
export class GetListProductHandler
  implements IQueryHandler<GetListProduct> {
  constructor(
    private readonly productRepo: ProductRepo,
  ) { }

  async execute(q: GetListProduct) {
    const { pagination } = q;

    const condition: FindConditions<Product> = {};
    if (pagination.keyword) {
      condition.product_name = Like(`%${pagination.keyword}%`);
    }

    const [products, count] = await this.productRepo.findAndCount({
      where: condition,
      skip: pagination.offset,
      take: pagination.limit,
      order: { id: 'DESC' },
    });
    return new PaginationResponse(products, count);
  }
}
