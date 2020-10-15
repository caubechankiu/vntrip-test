import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities';

@EntityRepository(Order)
export class OrderRepo extends Repository<Order> { }
