// tslint:disable variable-name
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('products')
@Index('product_code', ['product_code'], { unique: true })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15 })
  product_code: string;

  @Column()
  product_name: string;

  @Column()
  price: number;
}
