import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class GetEncrptyDataDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  @ApiProperty({ example: 'payload swagger' })
  payload: string;
}