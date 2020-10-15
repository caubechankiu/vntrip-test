import { CreateProductBody } from '../../dtos/body';

export class CreateProduct {
  constructor(
    public readonly body: CreateProductBody,
  ) { }
}
