import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService } from '../../services/blog.service';
import { Album } from '../../models/blogModels';
import { StorageService } from '../../services/storage.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums:       Album[] = []        // this is for backup
  filterAlbums: Album[]
  myProfile:    boolean
  loading:      boolean

  constructor(private activateRoute: ActivatedRoute,
              private blogService: BlogService,
              public storageService: StorageService
              ) {

    this.filterAlbums = this.albums
    this.loading   = true
    this.myProfile = false
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
    this.blogService.getAlbums().subscribe( (albumsData: Album[]) => {

      if( typeof albumsData !== 'undefined' ){
        this.albums.push(...albumsData)
        this.filterAlbums = this.albums
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
      this.filterAlbums = this.albums
      this.myProfile = true
      this.loading   = false
    }
    else {
      this.blogService.getAlbumsFromUser( userId ).subscribe( (albumsData: Album[]) =>{
        
        this.albums.push(...albumsData )
        this.filterAlbums = this.albums
        this.loading = false
      
      }, 
        ( errorServicio ) => {
          console.log(errorServicio);
        }
      )
    }
  }


  searchAlbum( searchTerm: string ) {
    if ( searchTerm.length == 0 ) {
      this.filterAlbums = this.albums
    } else {
      this.filterAlbums = [...this.filterAlbums.filter( album => album.title.toLowerCase().includes( searchTerm ) ),
                           ...this.filterAlbums.filter( album => album.userId.toString() == searchTerm ) ]
    }
  }


  delAlbum( albumId: number ) {
    if( this.storageService.deleteAlbum( albumId ) ) {
      (new MessageService).messageSuccess( 'Album deleted success!' )
      this.albums.splice( this.albums.findIndex( album => album.id == albumId ), 1 )
    }
  }


}
