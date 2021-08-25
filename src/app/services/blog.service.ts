import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }


  getQuery( query: string ) {

    const url = `https://jsonplaceholder.typicode.com/${ query }`;

    const headers = new HttpHeaders({
      responseType: 'json'
    });

    return this.http.get(url, { headers });
  }


  getUser( userId: number ) {
    return this.getQuery( 'users/' + userId );
  }


  getUsers() {
    return this.getQuery( 'users' );
  }

  
  getPosts() {
    return this.getQuery( 'posts' );
  }


  getPost( postId: number ) {
    return this.getQuery( 'posts/' + postId )
  }


  getPostsFromUser( userId: number ) {
    return this.getQuery( 'user/' + userId + '/posts' );
  }


  getCommentsFromPost( postId: number ) {
    return this.getQuery( 'posts/' + postId + '/comments' );
  }


  getAlbums() {
    return this.getQuery( 'albums' )
  }


  getAlbumsFromUser( userId: number ) {
    return this.getQuery( 'users/' + userId + '/albums' )
  }


  getPhotosFromAlbum( albumId: number ) {
    return this.getQuery( 'album/' + albumId + '/photos')
  }


  getTodos() {
    return this.getQuery( 'todos' )
  }


  getTodosFromUser( userId: number ) {
    return this.getQuery( 'users/' + userId + '/todos' )
  }


}
