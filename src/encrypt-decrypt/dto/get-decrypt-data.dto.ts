import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class GetDecrptyDataDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'encrypted data1' })
    data1: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'encrypted data2' })
    data2: string;
}