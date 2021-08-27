import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { StorageService } from '../../services/storage.service';

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
              private messageService: MessageService,
              private storageService: StorageService
              ) { 

  }


  /**
  * Check the login form and if is correct navigate to the home page.
  */
  loginSubmit() {
    if ( this.loginData.status === 'INVALID' ) {
      this.messageService.messageError( 'You have to give a proper Email, email or pass must have at least 4 characters.' )
    }
    else {
      if ( ! this.storageService.login( this.loginData.value.email, this.loginData.value.password ) ) {
        this.messageService.messageError( 'Wrong pass or email, try again!' )
      }else {
        this.messageService.messageSuccess( 'login success' )      
        this.router.navigate( ['/posts'] )
      }
    }
    this.loginData.reset();
  }


}
