import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){
  }
  canActivate() {
    if(!!localStorage.getItem('isLoggedIn')){
      this.router.navigate(["/"]);
      return false;
    }else{
      return true;
    }
  }
}
