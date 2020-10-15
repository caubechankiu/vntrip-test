// tslint:disable variable-name
import { IsNotEmpty, IsString, MaxLength, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductBody {
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'P0001', required: true })
  product_code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Bút chì màu', required: true })
  product_name: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({ type: 'number', example: 10000, required: true })
  price: number;
}
