import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService } from '../../services/blog.service';
import { User } from '../../models/blogModels';
import { AvatarService } from '../../services/avatar.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User[] = []
  myProfile: boolean
  loading: boolean

  constructor(private activateRoute: ActivatedRoute,
              private blogService: BlogService,
              private storageService: StorageService,
              public avatarService: AvatarService
              ) {

    this.loading   = true
    this.myProfile = false
  }


  ngOnInit(): void {

    this.activateRoute.params.subscribe( params => {

      if( params['id'] == this.storageService.getSessionId() ) {
        this.user = this.storageService.getUserFromStorage( params['id'] )
        this.loading   = false
        this.myProfile = true
      }
      else {
        this.blogService.getUser( params['id'] ).subscribe( (userData: User) => {

          if (typeof userData !== 'undefined') {
            this.user.push( userData )
            this.loading = false
          }

          }
        )
      }
    })
  }


}
