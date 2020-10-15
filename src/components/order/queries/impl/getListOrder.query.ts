import { PaginationQuery } from '../../../../common/dtos';
import { GetListOrderQuery } from '../../dtos/query';

export class GetListOrder {
  constructor(
    public readonly query: GetListOrderQuery,
    public readonly pagination: PaginationQuery,
  ) { }
}
