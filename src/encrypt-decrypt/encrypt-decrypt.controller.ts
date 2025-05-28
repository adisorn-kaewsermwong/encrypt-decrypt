import { Controller, Post, Body, InternalServerErrorException, HttpCode } from '@nestjs/common';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { GetEncrptyDataDto } from './dto/get-encrypt-data.dto';
import { JsonResponseEncryptData, ResponseDecryptData, ResponseEncryptData } from './dto/response-data.dto';
import { GetDecrptyDataDto } from './dto/get-decrypt-data.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('')
export class EncryptDecryptController {
  constructor(private readonly encryptDecryptService: EncryptDecryptService) {}

  @Post('get-encrypt-data')
  @HttpCode(200)
  @ApiBody({ type: GetEncrptyDataDto })
  @ApiResponse({ status: 200, description: 'Encrypt payload success' })
  @ApiResponse({ status: 500, description: 'Encrypt payload fail' })
  encrypt(@Body() getEncryptDataDto: GetEncrptyDataDto): JsonResponseEncryptData {
    let successful: boolean;
    let error_code: string;
    let result_data: null | ResponseEncryptData;

    try {
      const service_result = this.encryptDecryptService.encryptPayload(getEncryptDataDto);
      console.log(service_result);
      if (service_result.aes_encryped !== null && service_result.encrypted_payload !== null) {
        successful = true;
        error_code = '200';
        result_data = {
          'data1' : service_result.aes_encryped,
          'data2' : service_result.encrypted_payload
        };
      } else {
        successful = false;
        error_code = '500';
        result_data = null;
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return {
      'successful': successful,
      'error_code': error_code,
      'data': result_data,
    };
  }

  @Post('get-decrypt-data')
  @HttpCode(200)
  @ApiBody({ type: GetDecrptyDataDto })
  @ApiResponse({ status: 200, description: 'Decrypt payload success' })
  @ApiResponse({ status: 500, description: 'Decrypt payload fail' })
  decrypt(@Body() getDecryptDataDto: GetDecrptyDataDto) {
    let successful: boolean;
    let error_code: string;
    let result_data: null | ResponseDecryptData;
    try {
      const payload = this.encryptDecryptService.decryptPayload(getDecryptDataDto);

      if (payload !== null) {
        successful = true;
        error_code = '200';
        result_data = {
          'payload' : payload
        };
      } else {
        successful = false;
        error_code = '500';
        result_data = null
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return {
      'successful': successful,
      'error_code': error_code,
      'data': result_data,
    };
  }
}
