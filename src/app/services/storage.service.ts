import { Injectable, ɵRuntimeError } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserAndPass, Album } from '../models/blogModels';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private usersAndPasswords: UserAndPass[] = []
  private storageAlbums: Album[] = []

  constructor() { }


  login( email: string, password: string ): boolean {

    this.usersAndPasswords = this.getAllUsersFromStorage()
    if ( this.usersAndPasswords.length == 0 ) {
      return false
    }
    else {
      for( let userAndPass of this.usersAndPasswords ) {

        if( userAndPass.password == password && userAndPass.user.email == email ) {
          sessionStorage.setItem( 'session' , (userAndPass.user.id).toString() )
          return true
        }
      }
    }
    return false
  }


  register( form: FormGroup ): boolean {

    this.usersAndPasswords = this.getAllUsersFromStorage()
    let newUserAndPass     = this.newUserAndPass( form )

    if( this.isDuplicate( newUserAndPass ) ){
        return false
    }

    this.usersAndPasswords.push( newUserAndPass )
    this.setUsersInStorage()
    sessionStorage.setItem( 'session' , (newUserAndPass.user.id).toString() )
    return true
  }


  private getAllUsersFromStorage(): UserAndPass[] {
    return JSON.parse(localStorage.getItem( 'users' ) || '[]')
  }


  getUserFromStorage( userId: number ) {
    for( let usr of this.getAllUsersFromStorage() ) {
      if( usr.user.id == userId ){
        return usr.user
      }
    }
    return null
  }


  private setUsersInStorage() {
    localStorage.setItem( 'users', JSON.stringify( this.usersAndPasswords ) )
  }


  private newUserAndPass( form: FormGroup): UserAndPass {
    return {
      user:        {id:        this.getNewUserId(),
                    name:      form.value.name,
                    username:  form.value.username,
                    email:     form.value.email,
                    address:   {street:      form.value.street,
                                suite:       'unknown',
                                city:        form.value.city,
                                zipcode:     'unknown',
                                geo:         {lat: 'unknown', 
                                              lng: 'unknown'}},
                    phone:     form.value.phone,
                    website:   form.value.website,
                    company:   {name:        form.value.company,
                                catchPhrase: 'unknown',
                                bs:          'unknown'}
                    },
      password: form.value.password
    };
  }


  private isDuplicate( newU: UserAndPass ): boolean {

    for( let u of this.usersAndPasswords ) {
      if( u.password      == newU.password || 
          u.user.email    == newU.user.email || 
          u.user.username == newU.user.username ) {

            return true
      }
    }
    return false
  }


  private getNewUserId(): number {
    let size = this.usersAndPasswords.length
    if( size == 0 ){
      return 11
    }
    else {
      return ( this.usersAndPasswords[ size - 1 ].user.id ) + 1
    }
  }


  getSessionId() {
    return JSON.parse(sessionStorage.getItem( 'session' ) || '')
  }


  private getAlbumsFromStorage(): Album[] {
    return JSON.parse(localStorage.getItem( 'albums' ) || '[]')
  }


  private setAlbumsInStorage(  ) {
    localStorage.setItem( 'albums', JSON.stringify( this.storageAlbums ) )
  }


  userAlbumsStorage( userId: number ) {

    this.storageAlbums = this.getAlbumsFromStorage()
    let userAlbums: Album[] = []
    for( let album of this.storageAlbums ){

      if( album.userId == userId ){
        userAlbums.push( album )
      }
    }
    return userAlbums
  }


  addNewAlbum( albumTitle: string, userId: number ) {
    
    this.storageAlbums.push( {userId: userId, id: this.getNewAlbumId(), title: albumTitle} )
    this.setAlbumsInStorage()
  }


  private getNewAlbumId(): number {
    let size = this.storageAlbums.length
    if( size == 0 ){
      return 101
    }
    else {
      return ( this.storageAlbums[ size - 1 ].id ) + 1
    }
  }



}
