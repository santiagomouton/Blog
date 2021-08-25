import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

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


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private messageService: MessageService
              ) { 

  }


  /**
  * Check the login form and if is correct navigate to the home page.
  */
  loginSubmit() {
    // Process checkout data here
    if ( this.loginData.status === 'INVALID' ) {
      this.messageService.messageError( 'You have to give a proper Email, email or pass must have at least 4 characters.' )
    }
    else {
      this.messageService.messageSuccess( 'login success' )      
      this.router.navigate( ['/home'] )
    }
    this.loginData.reset();
  }


}
