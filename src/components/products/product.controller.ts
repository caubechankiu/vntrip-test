import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseGuards, Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { Pagination, ApiPagination } from '../../common/decorators';
import { PaginationQuery } from '../../common/dtos';
import { ProductParam } from './dtos/param';
import { CreateProductBody, UpdateProductBody } from './dtos/body';
import { GetListProduct, GetOneProduct } from './queries/impl';
import { BasicGuard } from '../../common/guards';
import { CreateProduct, UpdateProduct } from './commands/impl';

@ApiTags('product')
@ApiBearerAuth()
@UseGuards(BasicGuard)
@Controller('api/product')
export class ProductController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) { }

  // Query
  @ApiPagination({ search: true })
  @Get()
  async getListProduct(@Pagination() pagination: PaginationQuery) {
    return this.queryBus.execute(new GetListProduct(pagination));
  }

  @Get(':productId')
  async getOneProduct(@Param() param: ProductParam) {
    const { productId } = param;
    return this.queryBus.execute(new GetOneProduct(productId));
  }

  @Post()
  async createProduct(@Body() body: CreateProductBody) {
    return this.commandBus.execute(new CreateProduct(body));
  }

  @Put(':productId')
  async updateProduct(@Param() param: ProductParam, @Body() body: UpdateProductBody) {
    const { productId } = param;
    return this.commandBus.execute(new UpdateProduct(productId, body));
  }
}
