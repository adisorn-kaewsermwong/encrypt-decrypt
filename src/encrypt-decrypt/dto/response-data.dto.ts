import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseEncryptData {
  @ApiProperty()
  data1: string;

  @ApiProperty()
  data2: string;
}

export class JsonResponseEncryptData {
  @ApiProperty()
  successful: boolean;

  @ApiProperty()
  error_code: string;

  @ApiPropertyOptional({ type: () => ResponseEncryptData, nullable: true })
  data: ResponseEncryptData | null;
}

export class ResponseDecryptData {
  @ApiProperty()
  payload: string;
}

export class JsonResponseDecryptData {
  @ApiProperty()
  successful: boolean;

  @ApiProperty()
  error_code: string;

  @ApiPropertyOptional({ type: () => ResponseDecryptData, nullable: true })
  data: ResponseDecryptData | null;
}