import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SecureStorageService } from '../services/secureStorage-service/secure-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (typeof window !== 'undefined') {

    const secureStorage = inject(SecureStorageService);

    const token = secureStorage.getItem('token');
    const roleId = secureStorage.getItem('role_id'); // Get the user's role_id

    if (!token) {
      // Redirect to login if no token exists
      const router = inject(Router);
      router.navigate(['/login']);
      return false;
    }

    // Define restricted routes for role_id 4 (employee)
    const restrictedRoutesForEmployee = ['/organisation', '/resource-management'];

    if (roleId === '4' && restrictedRoutesForEmployee.some(route => state.url.startsWith(route))) {
      // Deny access to restricted routes for role_id 4
      const router = inject(Router);
      router.navigate(['/timesheet']); // Redirect to timesheet or a forbidden page
      return false;
    }

    return true; // Allow access for other roles
  }

  // Redirect to login if window is undefined (SSR)
  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};