import { Module } from '@nestjs/common';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { EncryptDecryptController } from './encrypt-decrypt.controller';

@Module({
  controllers: [EncryptDecryptController],
  providers: [EncryptDecryptService],
})
export class EncryptDecryptModule {}