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
        // Fallback to plaintext storage with warning
        console.warn('Storing data unencrypted due to encryption failure');
        localStorage.setItem(key, value);
      }
    }
  }

  getItem(key: string): any {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) return null;

      // First try to decrypt
      try {
        const decrypted = this.encryptionService.decrypt(storedValue);
        try {
          return JSON.parse(decrypted);
        } catch {
          return decrypted;
        }
      } catch (decryptError) {
        console.warn(`Decryption failed for ${key}, trying plaintext`);
        
        // If decryption fails, try to parse as plain JSON
        try {
          return JSON.parse(storedValue);
        } catch (parseError) {
          // Return as-is if not JSON
          return storedValue;
        }
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
