import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router){
  }
  canActivate() {
    if(!!localStorage.getItem('isLoggedIn')){
      return true;
    }else{
      this.router.navigate(["/signin"]);
      return false;
    }
  }
}
