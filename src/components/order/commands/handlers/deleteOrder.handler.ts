
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteOrder } from '../impl';
import { OrderRepo } from '../../../../typeorm/repositories';

@CommandHandler(DeleteOrder)
export class DeleteOrderHandler
  implements ICommandHandler<DeleteOrder> {
  constructor(
    private readonly orderRepo: OrderRepo,
  ) { }

  async execute(c: DeleteOrder) {
    const { orderId } = c;

    await this.orderRepo.delete({ id: orderId });
  }
}
