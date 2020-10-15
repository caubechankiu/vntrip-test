import { ApiQuery } from '@nestjs/swagger';

const ApiPageSize = () => (target, name, descriptor) => {
  ApiQuery({ name: 'size', type: 'number', required: false })(target, name, descriptor);
  ApiQuery({ name: 'page', type: 'number', required: false })(target, name, descriptor);
};

const ApiSearch = () => (target, name, descriptor) => {
  ApiQuery({ name: '_keyword', type: 'string', required: false })(target, name, descriptor);
};

const ApiSort = () => (target, name, descriptor) => {
  ApiQuery({ name: 'sorts', type: 'string', required: false })(target, name, descriptor);
};

const ApiFilter = () => (target, name, descriptor) => {
  ApiQuery({ name: 'filters', type: 'string', required: false })(target, name, descriptor);
};

export const ApiPagination = (options: { search?: boolean, filters?: boolean } = { search: false, filters: false }) => (target, name, descriptor) => {
  ApiPageSize()(target, name, descriptor);
  ApiSort()(target, name, descriptor);
  if (options.search) {
    ApiSearch()(target, name, descriptor);
  }
  if (options.filters) {
    ApiFilter()(target, name, descriptor);
  }
};
