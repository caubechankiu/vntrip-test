import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../entities';

@EntityRepository(Product)
export class ProductRepo extends Repository<Product> { }
