// tslint:disable variable-name
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Bút chì màu', required: true })
  product_name: string;

  @IsNumber()
  @Min(1)
  @ApiProperty({ type: 'number', example: 10000, required: true })
  price: number;
}
