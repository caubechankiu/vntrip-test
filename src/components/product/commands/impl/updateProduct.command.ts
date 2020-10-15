import { UpdateProductBody } from '../../dtos/body';

export class UpdateProduct {
  constructor(
    public readonly productId: number,
    public readonly body: UpdateProductBody,
  ) { }
}
