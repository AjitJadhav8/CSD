import { Injectable } from '@angular/core';
import { EncryptionService } from '../encryption-service/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {

  constructor(private encryptionService: EncryptionService) {}

  setItem(key: string, value: any): void {
    if (typeof window !== 'undefined') {
      try {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        const encryptedValue = this.encryptionService.encrypt(stringValue);
        localStorage.setItem(key, encryptedValue);
      } catch (e) {
        console.error(`Failed to store item ${key}`, e);
        // Optionally fallback to plaintext with warning
        localStorage.setItem(key, value);
      }
    }
  }

  getItem(key: string): any {
    if (typeof window !== 'undefined') {
      try {
        const encryptedValue = localStorage.getItem(key);
        if (encryptedValue) {
          const decryptedValue = this.encryptionService.decrypt(encryptedValue);
          try {
            return JSON.parse(decryptedValue);
          } catch {
            return decryptedValue;
          }
        }
      } catch (e) {
        console.error(`Failed to retrieve item ${key}`, e);
        // Fallback to plaintext if decryption fails
        return localStorage.getItem(key);
      }
    }
    return null;
  }

  removeItem(key: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }
}
