import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseGuards, Controller, Get, Param, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { Pagination, ApiPagination } from '../../common/decorators';
import { PaginationQuery } from '../../common/dtos';
import { OrderParam } from './dtos/param';
import { CreateOrderBody, UpdateOrderBody } from './dtos/body';
import { GetListOrder, GetOneOrder } from './queries/impl';
import { BasicGuard } from '../../common/guards';
import { CreateOrder, UpdateOrder, DeleteOrder } from './commands/impl';
import { GetListOrderQuery } from './dtos/query';

@ApiTags('order')
@ApiBearerAuth()
@UseGuards(BasicGuard)
@Controller('api/order')
export class OrderController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) { }

  /* #region  Query */
  @ApiPagination()
  @Get()
  async getListOrder(@Pagination() pagination: PaginationQuery, @Query() query: GetListOrderQuery) {
    return this.queryBus.execute(new GetListOrder(query, pagination));
  }

  @Get(':orderId')
  async getOneProduct(@Param() param: OrderParam) {
    const { orderId } = param;
    return this.queryBus.execute(new GetOneOrder(orderId));
  }
  /* #endregion */

  /* #region  Command */
  @Post()
  async createProduct(@Body() body: CreateOrderBody) {
    return this.commandBus.execute(new CreateOrder(body));
  }

  @Put(':orderId')
  async updateOrder(@Param() param: OrderParam, @Body() body: UpdateOrderBody) {
    const { orderId } = param;
    return this.commandBus.execute(new UpdateOrder(orderId, body));
  }

  @Delete(':orderId')
  async deleteOrder(@Param() param: OrderParam) {
    const { orderId } = param;
    return this.commandBus.execute(new DeleteOrder(orderId));
  }
  /* #endregion */
}
