import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Check if window is defined to avoid SSR errors
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token'); // Access localStorage safely

    if (token) {
      return true; // Allow access if token exists
    }
  }

  // Redirect to login if token is missing
  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};
