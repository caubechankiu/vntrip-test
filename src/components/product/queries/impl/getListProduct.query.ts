import { PaginationQuery } from '../../../../common/dtos';

export class GetListProduct {
  constructor(
    public readonly pagination: PaginationQuery,
  ) { }
}
