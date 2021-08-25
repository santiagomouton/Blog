import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/blogModels';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] = []
  loading: boolean

  constructor(private blogService: BlogService,
              private messageService: MessageService,
              private activateRoute: ActivatedRoute
              ) {
    
    this.loading = true            
  }


  ngOnInit() {
    
    this.activateRoute.params.subscribe( params => {
      if (typeof params['userId'] == 'undefined') {
        this.getPosts();
      } 
      else {
        this.getPostFromUser( params['userId'] );
      }
      },
      (error: any) => console.log(error)
    )
  }


  getPosts() {
    this.blogService.getPosts().subscribe( (postsdata: any) => {
      if( typeof postsdata !== 'undefined' ){
        this.posts.push(...postsdata)
        this.loading = false
      }
    },
      ( errorServicio ) => {
        console.log(errorServicio);
        this.messageService.messageError( errorServicio.error.error.message );
      }
    )
  }


  getPostFromUser( userId: number ) {
    this.blogService.getPostsFromUser( userId ).subscribe( (postData: any) =>{
      this.posts.push(...postData )
      this.loading = false
    }, 
      ( errorServicio ) => {
        console.log(errorServicio);
        this.messageService.messageError( errorServicio.error.error.message );
      }
    )
  }

  
}
