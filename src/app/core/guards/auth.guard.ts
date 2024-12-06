import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = true;
    if (!isLoggedIn) {
      this.router.navigate(['/calendar']); // Redirect to calendar page
      return false;
    }
    return true;
  }
}
