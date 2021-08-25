import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post, User } from '../../models/blogModels';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  user: User = {}
  post: Post = {}
  loading: boolean;

  constructor(private activateRoute: ActivatedRoute,
              private blogService: BlogService,
              private messageService: MessageService
              ) {

    this.loading = true;
  }


  ngOnInit(): void {


    this.loading = false;
  }


  postInfo() {
    this.activateRoute.params.subscribe( params => {
      this.blogService.getPost( params['id'] )
      .subscribe((postData: any) => {
        if (typeof postData !== 'undefined') {
          this.post = postData
        }
      },
      (error: any) => console.log(error),
      () => console.log('complete')
    )})
  }


  userInfo( userId: number ) {
    this.blogService.getUser( userId ).subscribe((userData: any) => {
      if (typeof userData !== 'undefined') {
        this.user = userData
      }
    },
    (error: any) => this.messageService.messageError(error),
    () => console.log('complete')
    )
  }


}
