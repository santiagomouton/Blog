import { Injectable, ɵRuntimeError } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UserAndPass, Album, Post, User } from '../models/blogModels';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly defaultIdUser  = 11
  private readonly defaultIdAlbum = 101
  private readonly defaultIdPost  = 101

  private usersAndPasswords: UserAndPass[] = []
  private storageAlbums: Album[] = []
  private storagePosts: Post[] =[]

  constructor() {

    this.usersAndPasswords = this.getAllUsersFromStorage()
    this.storageAlbums     = this.getAlbumsFromStorage()
    this.storagePosts      = this.getPostsFromStorage() 
  }


  /**
   * This method is common for all methods that creates news ids
   * @param storageElement array of any element that correspond to localStorage
   * @param defaultId      default id
   * @returns new id
   */
  private newId( storageElement: any, defaultId: number ): number {
    let size = storageElement.length
    if( size == 0 ){
      return defaultId
    }
    else {
      return ( storageElement[ size - 1 ].id ) + 1
    }
  }


  login( email: string, password: string ): boolean {

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

    let newUserAndPass = this.newUserAndPass( form )

    if( this.isDuplicate( newUserAndPass ) ){
        return false
    }

    this.usersAndPasswords.push( newUserAndPass )
    this.setUsersInStorage()
    sessionStorage.setItem( 'session' , (newUserAndPass.user.id).toString() )
    return true
  }


  getAllUsersFromStorage(): UserAndPass[] {
    return JSON.parse(localStorage.getItem( 'users' ) || '[]')
  }


  getUserFromStorage( userId: number ): User | null {
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
    return this.newId( this.usersAndPasswords.filter(userAndPass => userAndPass.user ) , this.defaultIdUser)
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


  userAlbumsStorage( userId: number ): Album[] {
    return this.storageAlbums.filter( album => album.userId == userId )
  }


  addNewAlbum( albumTitle: string, userId: number ) {
    this.storageAlbums.push( {userId: userId, id: this.getNewAlbumId(), title: albumTitle} )
    this.setAlbumsInStorage()
  }


  private getNewAlbumId(): number {
    return this.newId( this.storageAlbums, this.defaultIdAlbum )
  }


  userPostsStorage( userId: number ): Post[] {
    return this.storagePosts.filter( post => post.userId == userId )
  }


  addNewPost( userId: number, title: string, body: string ) {
    this.storagePosts.push( {userId: userId, id: this.getNewPostId(), title: title, body: body } )
    this.setPostsInStorage()
  }


  private getNewPostId(): number {
    return this.newId( this.storagePosts, this.defaultIdPost )
  }


  private setPostsInStorage() {
    localStorage.setItem( 'posts', JSON.stringify( this.storagePosts ) )
  }


  private getPostsFromStorage(): Post[] {
    return JSON.parse(localStorage.getItem( 'posts' ) || '[]')
  }


  getPostById( postId: number ) {
    return this.storagePosts.filter( post => post.id == postId )
  }


}
