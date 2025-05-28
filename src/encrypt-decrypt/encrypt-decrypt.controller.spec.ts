import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../app.module';

describe('EncryptDecryptController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/get-encrypt-data (POST) should return encrypted data with data_1 and data_2', async () => {
    const response = await request(app.getHttpServer())
      .post('/get-encrypt-data')
      .send({ payload: "encrypt this message" })
      .expect(200);

    expect(response.body.successful).toBe(true);
    expect(response.body.error_code).toBe('200');
    expect(response.body.data).toHaveProperty('data1');
    expect(response.body.data).toHaveProperty('data2');
  });

  it('/get-decrypt-data (POST) should return decrypted data with input message', async () => {
    const response = await request(app.getHttpServer())
      .post('/get-decrypt-data')
      .send({
            "data1": "RLjvi23X7mrIya1qcrli6GvpC+7HYdL2rl7SRZ9tXHvJM6P/ULIqMtDm3XOXjXSZOND8jES3XetUgUejKJGh2UQl3EH5+1m468YoTqcxkbXiVSr4PIha8Zu//IEgUOn5NpLncD+hNoXyb6vpLTdOB7XTlWhxOd9RBt/MIE4qvfo=",
            "data2": "Law679SB2w0qyhcmRvy4sSyCElyQYBtgefwjHhw8GZI="
        })
      .expect(200);

    expect(response.body.successful).toBe(true);
    expect(response.body.error_code).toBe('200');
    expect(response.body.data).toHaveProperty('payload');
  });

  afterAll(async () => {
    await app.close();
  });
});
