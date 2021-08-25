import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { User } from '../../models/blogModels';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = {}
  loading: boolean

  constructor(private activateRoute: ActivatedRoute,
              private blogService: BlogService
              ) {

    this.loading = true
  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe( params => {

      this.blogService.getUser( params['id'] ).subscribe((userData: any) => {

        if (typeof userData !== 'undefined') {
          this.user = userData
          console.log(this.user)
          this.loading = false
        }

        }
      )
    })
  }

}
