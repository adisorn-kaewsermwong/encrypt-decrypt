import { Injectable } from '@nestjs/common';
import { GetEncrptyDataDto } from './dto/get-encrypt-data.dto';
import * as crypto from 'crypto';
import { GetDecrptyDataDto } from './dto/get-decrypt-data.dto';

@Injectable()
export class EncryptDecryptService {
  private readonly algorithm = 'aes-256-ecb';
  private readonly aes_key = crypto.randomBytes(32).toString('hex');
  private readonly private_key = '-----BEGIN RSA PRIVATE KEY-----\nMIICWgIBAAKBgFQUOG0O0zIb6qECDgC8lGG/boYSPG7pQT/9wz1BY6flAJhY596o\nv1nLP6OGdA4kOLtS6HcYLzRi3KosTewYZIJYoe3BAD1yRM+nmEEvTdw1vflr9fbX\npNJqOMtFTcla2zwhKMaWbNY/hXblRYwXhK4cPGNuQ6HIAX3dXC/F35DxAgMBAAEC\ngYAUTgnOdJ0WZd2E4q0lCmW/MW7sm+zSUCx82rjSyz7Y5hn9sMLWZ+RGOCp3QFo4\nrBCzVHNlh4am3RUzV5293aov9SOX5vLYUUseJrsw8pFLYE5DPzubFylDaSe+qxmq\n86J8BeN8VCpmrev5f+afygIkSU9cZojCc79jFwGQFxBwLQJBAKJg51SkxvQ0C/Ry\n18rPOE3DoY1ZV684xX7+DoeFa8a8D2Nb8JQGXrSsBE2pb34sMWHpsU1lnQQE9qjx\neSlGYYcCQQCEjkq4l/gEy5fqs4uv7jMLU2z0IHVApXZKoF3xW+VYgp+gKNXSJ6mQ\n66t/XJTuEiNKH57EzBS0sAYGlTQFjHfHAkAvFJ2+QxCUmcqlk+7RlQekNIbQ7win\ne3R3/73CuYKoWrqzemLk6HvpMr8ErY3wLWwcEaAg6sd99Np33ZvdxdRdAkAraMXD\nidDpERtg+wdlx+XjcaCemfqL/yOr8LSTE/sZbz2DH5xWRDLdiLAS92i2Ri5UWeKO\npB6rxXFTuozcvFGFAkBOKBY5vRxZkbnIZ/S8mRb3NQX91j3LAStr/bnNsOpfzzjS\n9y6WPdRpfPNdpkevp5sThOedly/wwbX49qbTms4q\n-----END RSA PRIVATE KEY-----';
  private readonly public_key = '-----BEGIN PUBLIC KEY-----\nMIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFQUOG0O0zIb6qECDgC8lGG/boYS\nPG7pQT/9wz1BY6flAJhY596ov1nLP6OGdA4kOLtS6HcYLzRi3KosTewYZIJYoe3B\nAD1yRM+nmEEvTdw1vflr9fbXpNJqOMtFTcla2zwhKMaWbNY/hXblRYwXhK4cPGNu\nQ6HIAX3dXC/F35DxAgMBAAE=\n-----END PUBLIC KEY-----';

  /**
   * 
   * @param randomString 
   * @returns 
   */
  generateAesKeyFromString(randomString: string): Buffer {
    // create random string for AES key
    return crypto.createHash('sha256').update(randomString).digest();
  }

  /**
   * 
   * @param getEncryptDataDto 
   * @returns 
   */
  encryptMessageWithAesKey(getEncryptDataDto: GetEncrptyDataDto, aes_key_from_string: Buffer): Buffer {
    // payload from request
    const payload = getEncryptDataDto.payload;
    // gen ciper text
    const cipherText = crypto.createCipheriv(this.algorithm, aes_key_from_string, null);
    // encrypt payload
    const encrypted_payload = Buffer.concat([cipherText.update(payload, 'utf8'), cipherText.final()]);

    return encrypted_payload;
  }

  /**
   * 
   * @param aes_key_from_string 
   * @returns 
   */
  encryptAesKeyWithPrivateKey(aes_key_from_string: Buffer) {
    // encrypt AES key with public key
    const encrypted_aes_key = crypto.privateEncrypt(
      {
        key: this.private_key,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      aes_key_from_string
    );

    return encrypted_aes_key;
  }

  /**
   * 
   * @param getEncryptDataDto 
   * @returns 
   */
  encryptPayload(getEncryptDataDto: GetEncrptyDataDto) {
    // gen AES key from string
    const aes_key_from_string = this.generateAesKeyFromString(this.aes_key);
    // encrypt message with AES Key
    const encrypted_payload = this.encryptMessageWithAesKey(getEncryptDataDto, aes_key_from_string);
    // encrypt AES key with public key
    const encrypted_aes_key = this.encryptAesKeyWithPrivateKey(aes_key_from_string);

    return {
      aes_encryped: encrypted_aes_key.toString('base64'),
      encrypted_payload: encrypted_payload.toString('base64')
    }
  }

  /**
   * 
   * @param payload_encryped 
   * @param aes_key 
   * @returns
   */
  decryptPayloadWithAesKey(payload_encryped: string, aes_key: Buffer) {
    // decrypt payload
    const decipher = crypto.createDecipheriv('aes-256-ecb', aes_key, null);
    let decrypted = decipher.update(payload_encryped, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  /**
   * 
   * @param aes_key_encrypted 
   * @returns 
   */
  decryptAesKeyWithPublicKey(aes_key_encrypted: string) {
    // convert string to Buffer type
    const encrypted_aes_key_buffer = Buffer.from(aes_key_encrypted, 'base64')
    // decrypt get AES key
    const decrypted_aes_key = crypto.publicDecrypt(
    {
      key: this.public_key,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
      encrypted_aes_key_buffer
    );

    return decrypted_aes_key;
  }

  /**
   * 
   * @param getDecryptDataDto 
   * @returns 
   */
  decryptPayload(getDecryptDataDto: GetDecrptyDataDto): string {
      const decrypted_aes_key = this.decryptAesKeyWithPublicKey(getDecryptDataDto.data1);
      const payload = this.decryptPayloadWithAesKey(getDecryptDataDto.data2, decrypted_aes_key);

      return payload;
  }
}
