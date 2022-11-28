import { Injectable } from '@nestjs/common';
import * as Crypto from 'crypto-js';
import { cryptoVariables } from './cryptography';
@Injectable()
export class CryptographyService {
  encryptAESfunction(objToEncrypt: string) {
    return Crypto.AES.encrypt(objToEncrypt, cryptoVariables.key, {
      keySize: 128 / 8,
      iv: Crypto.enc.Utf8.parse(cryptoVariables.iv),
      padding: Crypto.pad.Pkcs7,
      mode: Crypto.mode.CBC,
    }).toString();
  }

  decryptAESfunction(cipheToDecrypt: string) {
    return Crypto.AES.decrypt(cipheToDecrypt, cryptoVariables.key, {
      keySize: 128 / 8,
      iv: Crypto.enc.Utf8.parse(cryptoVariables.iv),
      padding: Crypto.pad.Pkcs7,
      mode: Crypto.mode.CBC,
    }).toString(Crypto.enc.Utf8);
  }
}
