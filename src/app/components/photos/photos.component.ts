import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService } from '../../services/blog.service';
import { Photo } from '../../models/blogModels';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  photos:     Photo[] = []
  loading:    boolean
  viewPhoto:  boolean
  indexPhoto: number

  constructor(private activateRoute: ActivatedRoute,
              private blogService: BlogService
              ) { 

    this.loading    = true
    this.viewPhoto  = false
    this.indexPhoto = -1
  }


  ngOnInit(): void {

    this.activateRoute.params.subscribe( params => {

      if (typeof params['id'] !== 'undefined') {

        this.blogService.getPhotosFromAlbum( params[ 'id' ] ).subscribe( (dataPhotos: Photo[]) => {

          this.photos.push(...dataPhotos)
          this.loading = false
        },
        
        (error) => console.log( error )
        )
      }
    })
  }


  viewPhotoDetail( indexPhoto: number ) {
    this.indexPhoto = indexPhoto
    this.viewPhoto  = true
  }


}
