import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = this.formBuilder.group({
    email: new FormControl('', {validators: [Validators.required, Validators.email, Validators.minLength(4)]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]})
  });

  registerData = this.formBuilder.group({
    email: new FormControl('', {validators: [Validators.required, Validators.email, Validators.minLength(4)]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
    username: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]})
  });

  register: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router
              ) { 

    this.register = false;
  }


  /**
  * Check the login form and if is correct navigate to the home page.
  */
  loginSubmit() {
    // Process checkout data here
    if ( this.loginData.status === 'INVALID' ) {
      this.messageError( 'You have to give a proper Email, email or pass must have at least 4 characters.' )
    }
    else {
      this.messageSuccess( 'login success' )      
      this.router.navigate( ['/home'] )
    }
    this.loginData.reset();
  }


  /**
  * Check the login form and if is correct navigate to the home page.
  */
  registerSubmit() {
    // Process checkout data here
    if ( this.registerData.status === 'INVALID' ) {
      this.messageError( 'You have to give a proper Email, username email or pass must have at least 4 characters.' )
    }
    else {
      this.messageSuccess( 'Register success' )      
      this.router.navigate( ['/home'] )
    }
    this.loginData.reset();
  }


  registerAction() {
    this.register = true;
  }


  /**
  * A elegant windows appears whit messageError of params.
  * @param messageError Error message.
  */
  messageError ( messageError: string ) {
    Swal.fire({
      icon:  'error',
      title: 'Oops...',
      text:  messageError
    })
  }
  
  
  /**
  * A elegant windows appears whit messageSuccess of params.
  * @param messageSuccess Success message.
  */
  messageSuccess ( messageSuccess: string ){
    Swal.fire({
      icon:  'success',
      title: 'Good job!',
      text:  messageSuccess
    })
  }

}
