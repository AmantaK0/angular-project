import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router){
  }
  canActivate() {
    if(JSON.parse(localStorage.getItem('user')!).type === "admin"){
      return true;
    }else{
      this.router.navigate(["/signin"]);
      return false;
    }
  }
}
