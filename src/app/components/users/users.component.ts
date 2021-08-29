import { Component, OnInit } from '@angular/core';

import { BlogService } from '../../services/blog.service';
import { User } from '../../models/blogModels';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = []

  constructor(private blogService: BlogService,
              private storageService: StorageService
              ) { }

  ngOnInit(): void {

    /* Primero obtengo los usuarios almacenados en el local storage */
    //this.users = (this.storageService.getAllUsersFromStorage() || [])

    /* Luego los de la api */
    this.blogService.getUsers().subscribe( (usersData: User[]) => {

      if( typeof usersData !== 'undefined' ){
        this.users.push(...usersData)
      }
    })

  }

}
