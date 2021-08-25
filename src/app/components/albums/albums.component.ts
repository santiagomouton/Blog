import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Album } from '../../models/blogModels';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums: Album[] = []
  loading: boolean

  constructor(private activateRoute: ActivatedRoute,
              private blogService: BlogService
              ) {

    this.loading = true
  }


  ngOnInit() {
    
    this.activateRoute.params.subscribe( params => {

      if (typeof params['id'] == 'undefined') {
        this.getAlbums();
      }
      
      else {
        this.getAlbumsFromUser( params['id'] );
      }

    })
  }


  getAlbums() {
    this.blogService.getAlbums().subscribe( (albumData: any) => {

      if( typeof albumData !== 'undefined' ){
        this.albums.push(...albumData)  
        console.log(this.albums);
        this.loading = false
      }

    },
      ( errorServicio ) => {
        console.log(errorServicio);
      }
    )
  }


  getAlbumsFromUser( userId: number ) {
    this.blogService.getAlbumsFromUser( userId ).subscribe( (postData: any) =>{
      
      this.albums.push(...postData )
      console.log(this.albums);
      this.loading = false
    
    }, 
      ( errorServicio ) => {
        console.log(errorServicio);
      }
    )
  }


}
