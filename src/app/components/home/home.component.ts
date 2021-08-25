import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/blogModels';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  posts: Post[] = []

  constructor(private blogService: BlogService,
              private messageService: MessageService
              ) {

    this.blogService.getPosts().subscribe( (data: any) => {
      this.posts.push(...data)
      console.log(this.posts[0]);
    }, ( errorServicio ) => {

      //this.loading = false;
      //this.error = true;
      console.log(errorServicio);
      this.messageService.messageError( errorServicio.error.error.message );

    });

  }

}
