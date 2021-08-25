import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post, User } from '../../models/blogModels';
import { MessageService } from '../../services/message.service';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  user: User = {}
  post: Post = {}
  comments: Comment[] = []
  loading: boolean

  constructor(private activateRoute: ActivatedRoute,
              private blogService: BlogService,
              private messageService: MessageService
              ) {
    
    this.loading = true
  }


  ngOnInit(): void {

    this.activateRoute.params.subscribe( params => {
        this.getPost( params['id'] )
      }
    )
    
  }


  getPost( postId: number ) {
    this.blogService.getPost( postId ).subscribe((postData: any) => {

      if (typeof postData !== 'undefined') {
        this.post = postData
        this.getUser( this.post.userId )
        this.loading = false
      }

    },
      (error: any) => console.log(error)
    )
  }
  


  getUser( userId: any ) {
    this.blogService.getUser( userId ).subscribe((userData: any) => {

      if (typeof userData !== 'undefined') {
        this.user = userData
      }

    },
    (error: any) => console.log(error)
    )
  }


  openComments( postId: any ) {
    this.blogService.getCommentsFromPost( postId ).subscribe((commentsData: any) => {

      if (typeof commentsData !== 'undefined') {
        this.comments = commentsData
      }
      
    },
    (error: any) => console.log(error)
    )
  }

}
