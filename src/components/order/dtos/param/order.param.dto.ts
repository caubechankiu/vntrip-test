import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class OrderParam {
  @IsNumber()
  @Transform(v => Number(v))
  @ApiProperty({ type: 'number', example: 1, required: true })
  orderId: number;
}
