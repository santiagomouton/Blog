import { Component, OnInit } from '@angular/core';

import { BlogService } from '../../services/blog.service';
import { User, UserAndPass } from '../../models/blogModels';
import { StorageService } from '../../services/storage.service';
import { AvatarService } from '../../services/avatar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = []
  loading: boolean

  constructor(private blogService: BlogService,
              private storageService: StorageService,
              public avatarService: AvatarService
              ) {

    this.loading = true
  }

  ngOnInit(): void {

    /* Primero obtengo los usuarios almacenados en el local storage */
    this.users = this.storageService.getAllUsersFromStorage().map( userAndPass => userAndPass.user )

    /* Luego los de la api */
    this.blogService.getUsers().subscribe( (usersData: User[]) => {

      if( typeof usersData !== 'undefined' ){
        this.users.push(...usersData)
        this.loading = false
      }
    })

  }

}
