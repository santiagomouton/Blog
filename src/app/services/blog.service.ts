import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { User, Post, Comment, Album, Photo, Todo } from '../models/blogModels';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }


  getQuery( query: string ): Observable<any> {

    const url = `https://jsonplaceholder.typicode.com/${ query }`;

    const headers = new HttpHeaders({
      responseType: 'json'
    });

    return this.http.get(url, { headers });
  }


  getUser( userId: number ): Observable<User> {
    return this.getQuery( 'users/' + userId );
  }


  getUsers(): Observable<User[]> {
    return this.getQuery( 'users' );
  }


  getPosts( filter: string= '' ): Observable<Post[]> {
    return this.getQuery( 'posts' ).pipe(
      map( resp => resp[filter] )
    );
  }


  getPost( postId: number ): Observable<Post> {
    return this.getQuery( 'posts/' + postId )
  }


  getPostsFromUser( userId: number ): Observable<Post[]> {
    return this.getQuery( 'user/' + userId + '/posts' );
  }


  getCommentsFromPost( postId: number ): Observable<Comment[]> {
    return this.getQuery( 'posts/' + postId + '/comments' );
  }


  getAlbums(): Observable<Album[]> {
    return this.getQuery( 'albums' )
  }


  getAlbumsFromUser( userId: number ): Observable<Album[]> {
    return this.getQuery( 'users/' + userId + '/albums' )
  }


  getPhotosFromAlbum( albumId: number ): Observable<Photo[]> {
    return this.getQuery( 'album/' + albumId + '/photos')
  }


  getTodos(): Observable<Todo[]> {
    return this.getQuery( 'todos' )
  }


  getTodosFromUser( userId: number ): Observable<Todo[]> {
    return this.getQuery( 'users/' + userId + '/todos' )
  }


}
