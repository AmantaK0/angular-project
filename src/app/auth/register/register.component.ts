import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AuthService } from "../../shared/services/auth.service";
import { passwordValidator } from './validations/password.validator';
import { passwordMatchValidator } from './validations/passwordmatch.validator';


class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, signUpForm: FormGroupDirective | NgForm | null): boolean {
    return !!control?.dirty && (control.value !== signUpForm?.value.password);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMatcher = new CrossFieldErrorMatcher();

  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // form validation
    this.signUpForm = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required, passwordValidator(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      cpassword: ["", [Validators.required]],
      type: ["", [Validators.required]]
    }, {
      // cross-field validation
      validator: passwordMatchValidator
    });

  }

  passwordValidator(form: FormGroup) {
    const condition = form.get('password')?.value !== form.get('cpassword')?.value;

    return condition ? { passwordsDoNotMatch: true} : null;
  }

  onSubmit(){
    if(!this.signUpForm.valid) return
      this.authService.signUp(this.signUpForm.value);
  }

  get userName(){
    return this.signUpForm.get('username')
  }
  get email(){
    return this.signUpForm.get('email')
  }
  get password(){
    return this.signUpForm.get('password')
  }
  get cpassword(){
    return this.signUpForm.get('cpassword')
  }

}
 