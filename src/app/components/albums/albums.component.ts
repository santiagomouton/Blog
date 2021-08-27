import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Album } from '../../models/blogModels';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums:    Album[] = []
  userId:    number
  myProfile: boolean
  loading:   boolean

  constructor(private activateRoute: ActivatedRoute,
              private blogService: BlogService,
              public storageService: StorageService
              ) {

    this.loading   = true
    this.myProfile = false
    this.userId    = 0
  }


  ngOnInit() {
    
    this.activateRoute.params.subscribe( params => {

      if (typeof params['id'] == 'undefined') {
        this.getAlbums();
      }
      
      else {
        this.userId = params['id']
        this.getAlbumsFromUser( this.userId );
      }

    })
  }


  getAlbums() {
    this.blogService.getAlbums().subscribe( (albumsData: Album[]) => {

      if( typeof albumsData !== 'undefined' ){
        this.albums.push(...albumsData)  
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

    if( this.storageService.getSessionId() == userId ){
      this.albums = this.storageService.userAlbumsStorage( userId )
      this.myProfile = true
      this.loading   = false
    }
    else {
      this.blogService.getAlbumsFromUser( userId ).subscribe( (albumsData: Album[]) =>{
        
        this.albums.push(...albumsData )
        this.loading = false
      
      }, 
        ( errorServicio ) => {
          console.log(errorServicio);
        }
      )
    }
  }


}
