import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/blogModels';
import { MessageService } from '../../services/message.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postForm = new FormBuilder().group({
    title: new FormControl('', {validators: [Validators.required, Validators.minLength(1)]}),
    body: new FormControl('', {validators: [Validators.required, Validators.minLength(5)]})
  });

  posts: Post[] = []
  filterPosts: Post[]
  myProfile: boolean
  loading: boolean

  constructor(private blogService: BlogService,
              private activateRoute: ActivatedRoute,
              public storageService: StorageService,
              private messageService: MessageService
              ) {
    
    this.filterPosts = this.posts
    this.loading   = true   
    this.myProfile = false    
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

      this.posts.push( ...this.storageService.userPostsStorage( userId ) )
      this.myProfile = true
      this.loading   = false

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


  searchPost( searchTerm: string ) {
    console.log(searchTerm);
  }


  postSubmit() {
    if( this.postForm.status !== 'INVALID' ) {
      this.storageService.addNewPost( this.storageService.getSessionId(), this.postForm.value.title, this.postForm.value.body )
    }
    else {
      this.messageService.messageError( 'Title or text invalid' )
    }
    this.postForm.reset()
  }

  
}