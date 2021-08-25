import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

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
