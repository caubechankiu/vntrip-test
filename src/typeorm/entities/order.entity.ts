// tslint:disable variable-name
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

export enum OrderType {
  FURNITURE = 'furniture',
  KITCHEN = 'kitchen',
}

export enum OrderStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAIL = 'fail',
}

@Entity('orders')
@Index('order_code', ['order_code'], { unique: true })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15 })
  order_code: string;

  @Column({ type: 'enum', enum: OrderType })
  order_type: OrderType;

  @Column('simple-array')
  products: string[];

  @Column({ type: 'enum', enum: OrderStatus })
  order_status: OrderStatus;

  @Column()
  quantity: number;

  @Column()
  total_price: number;
}
