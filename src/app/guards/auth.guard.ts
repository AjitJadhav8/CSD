import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token'); // Assuming you store the JWT in localStorage

  if (token) {
    // Optionally, you can decode the token here to check expiry or roles
    return true; // Allow access if token exists
  } else {
    // Redirect to login if token is missing
    const router = inject(Router); // Inject the Router
    router.navigate(['/login']);
    return false;
  }
};
