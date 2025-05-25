import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EncryptDecryptModule } from './encrypt-decrypt/encrypt-decrypt.module';

@Module({
  imports: [EncryptDecryptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
