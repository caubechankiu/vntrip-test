import { CreateOrderBody } from '../../dtos/body';

export class CreateOrder {
  constructor(
    public readonly body: CreateOrderBody,
  ) { }
}
