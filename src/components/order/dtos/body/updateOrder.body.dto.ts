// tslint:disable variable-name
import { IsString, IsNumber, Min, IsEnum, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderType, OrderStatus } from '../../../../typeorm/entities';

export class UpdateOrderBody {
  @IsEnum(OrderType)
  @ApiProperty({ type: 'string', example: OrderType.FURNITURE, required: true })
  order_type: OrderType;

  @IsEnum(OrderStatus)
  @ApiProperty({ type: 'string', example: OrderStatus.PENDING, required: true })
  order_status: OrderStatus;

  @IsNumber()
  @Min(1)
  @ApiProperty({ type: 'number', example: 2, required: true })
  quantity: number;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ApiProperty({ type: 'string', example: ['P0001', 'P0002'], required: true, isArray: true })
  products: string[];

  @IsNumber()
  @Min(1)
  @ApiProperty({ type: 'number', example: 200000, required: true })
  total_price: number;
}
