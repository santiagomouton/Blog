import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { User } from '../../models/blogModels';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = []

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {

    this.blogService.getUsers().subscribe( (usersData: User[]) => {

      if( typeof usersData !== 'undefined' ){
      this.users.push(...usersData)
      }
    })

  }

}
