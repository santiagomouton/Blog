import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerData = this.formBuilder.group({
    email: new FormControl('', {validators: [Validators.required, Validators.email, Validators.minLength(4)]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
    username: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
    name: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
    city: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
    street: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
    phone: new FormControl('', {validators: [Validators.required, Validators.minLength(10), Validators.max(13)]}),
    website: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
    company: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]})
  });

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              private router: Router,
              private storageService: StorageService
              ) { }



  /**
  * Check the login form and if is correct navigate to the posts.
  */
  registerSubmit() {
    
    if ( this.registerData.status === 'INVALID' ) {
      this.messageService.messageError( 'Something is missing, check.' )
    }
    else {
      this.storageService.register( this.registerData )
      this.messageService.messageSuccess( 'Register success' )
      this.router.navigate( ['/posts'] )
    }
    this.registerData.reset();
  }


}
