import { UpdateOrderBody } from '../../dtos/body';

export class UpdateOrder {
  constructor(
    public readonly orderId: number,
    public readonly body: UpdateOrderBody,
  ) { }
}
