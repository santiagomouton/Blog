import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor() { }


  getAvatar( userId: number ): string {

    const url = `https://avatars.dicebear.com/api/avataaars/${ userId }.svg`;

    return url;
  }


}
