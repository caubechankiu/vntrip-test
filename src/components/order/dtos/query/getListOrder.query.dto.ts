// tslint:disable variable-name
import { IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderType, OrderStatus } from '../../../../typeorm/entities';
import { Transform } from 'class-transformer';

export class GetListOrderQuery {
  @IsNumber()
  @IsOptional()
  @Transform(v => Number(v))
  @ApiProperty({ type: 'number', example: 1, required: false })
  order_id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', example: 'VNT54321', required: false })
  order_code: string;

  @IsEnum(OrderType)
  @IsOptional()
  @ApiProperty({ type: 'string', example: OrderType.FURNITURE, required: false })
  order_type: OrderType;

  @IsEnum(OrderStatus)
  @IsOptional()
  @ApiProperty({ type: 'string', example: OrderStatus.PENDING, required: false })
  order_status: OrderStatus;
}
