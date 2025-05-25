import { Test, TestingModule } from '@nestjs/testing';
import { EncryptDecryptController } from './encrypt-decrypt.controller';
import { EncryptDecryptService } from './encrypt-decrypt.service';

describe('EncryptDecryptController', () => {
  let controller: EncryptDecryptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncryptDecryptController],
      providers: [EncryptDecryptService],
    }).compile();

    controller = module.get<EncryptDecryptController>(EncryptDecryptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
