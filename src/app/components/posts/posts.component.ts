import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/blogModels';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  search = new FormBuilder().group({
    search: new FormControl('', {validators: [Validators.required]})
  });

  postForm = new FormBuilder().group({
    title: new FormControl('', {validators: [Validators.required, Validators.minLength(1)]}),
    body: new FormControl('', {validators: [Validators.required, Validators.minLength(5)]})
  });

  posts: Post[] = []
  myProfile: boolean
  userId: number
  loading: boolean

  constructor(private blogService: BlogService,
              private activateRoute: ActivatedRoute,
              public storageService: StorageService,
              ) {
    
    this.loading   = true   
    this.myProfile = false
    this.userId = -1         
  }


  ngOnInit() {

    this.activateRoute.params.subscribe( params => {

      if (typeof params['id'] == 'undefined') {
        this.getPosts();
      }

      else {
        this.getPostsFromUser( params['id'] );
      }
    
    })
  }


  getPosts() {
    this.blogService.getPosts().subscribe( (postsData: Post[]) => {

      if( typeof postsData !== 'undefined' ){
        this.posts.push(...postsData)
        this.loading = false
      }
    },

      ( errorServicio ) => {
        console.log(errorServicio);
      }
    )
  }


  getPostsFromUser( userId: number ) {

    /* Check if Id corresponds to the actual session */
    if( userId == this.storageService.getSessionId() ){

      this.posts = this.storageService.userPostsStorage( userId )
      this.myProfile = true
      this.loading   = false
      this.userId = userId 

    } else{
    /* If not, look for user posts in the api */
      this.blogService.getPostsFromUser( userId ).subscribe( (postsData: Post[]) =>{

        this.posts.push(...postsData )
        this.loading = false

      },
      
        ( errorServicio ) => {
          console.log(errorServicio);
        }
      )
    }

  }


  searchPost() {
    if ( this.search.status !== 'INVALID' ) {
      this.posts = []
      console.log(this.search.value);
      //this.getPostsFromUser.
      this.search.reset()
    }
    else{
      //this.search.reset()
    }
  }


  postSubmit() {
    if( this.postForm.status !== 'INVALID' ) {
      this.storageService.addNewPost( this.userId, this.postForm.value.title, this.postForm.value.body )
    }
  }

  
}
