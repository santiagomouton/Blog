import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerData = this.formBuilder.group({
    email: new FormControl('', {validators: [Validators.required, Validators.email, Validators.minLength(4)]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
    username: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]})
  });

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              private router: Router
              ) { }



  /**
  * Check the login form and if is correct navigate to the home page.
  */
  registerSubmit() {
    // Process checkout data here
    if ( this.registerData.status === 'INVALID' ) {
      this.messageService.messageError( 'You have to give a proper Email, username email or pass must have at least 4 characters.' )
    }
    else {
      this.messageService.messageSuccess( 'Register success' )      
      this.router.navigate( ['/posts'] )
    }
    this.registerData.reset();
  }


}
