import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private readonly encryptionKey: string;


  constructor() {
    // Get key from environment (fallback for development)
    this.encryptionKey = environment.encryptionKey;
    
    // Validate key length (AES requires specific key sizes)
    if (this.encryptionKey.length !== 16 && this.encryptionKey.length !== 24 && this.encryptionKey.length !== 32) {
      console.warn('Encryption key should be 16, 24, or 32 characters for AES. Using padded key.');
      // Pad key to nearest valid length
      this.encryptionKey = this.padKey(this.encryptionKey);
    }
  }

  private padKey(key: string): string {
    const validLengths = [16, 24, 32];
    const targetLength = validLengths.find(len => len >= key.length) || 32;
    return key.padEnd(targetLength, '0').slice(0, targetLength);
  }

  encrypt(data: string): string {
    try {
      return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
    } catch (e) {
      console.error('Encryption error:', e);
      throw new Error('Failed to encrypt data');
    }
  }

  decrypt(encryptedData: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      
      if (!decrypted) {
        throw new Error('Decryption failed - possibly wrong key');
      }
      
      return decrypted;
    } catch (e) {
      console.error('Decryption error:', e);
      throw new Error('Failed to decrypt data');
    }
  }
}
