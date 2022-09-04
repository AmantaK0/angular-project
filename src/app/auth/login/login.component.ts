import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true; 

  error: any

  form = {
    email: "",
    password: ""
  }
  constructor( public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    this.authService.signIn(loginForm.value);
  }
}
