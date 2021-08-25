import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { PostsComponent } from './components/posts/posts.component';
import { NgModule } from '@angular/core';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { PhotosComponent } from './components/photos/photos.component';
import { TodosComponent } from './components/todos/todos.component';


export const ROUTES: Routes = [
    { path: 'login'                  ,  component: LoginComponent},
    { path: 'register'               ,  component: RegisterComponent},
    { path: 'posts'                  ,  component: PostsComponent},
    { path: 'profile/:userId/posts'  ,  component: PostsComponent},
    { path: 'post/:postId'           ,  component: PostComponent},
    { path: 'profile/:userId'        ,  component: ProfileComponent},
    { path: 'profile/:userId/albums' ,  component: AlbumsComponent},
    { path: 'albums'                 ,  component: AlbumsComponent},
    { path: 'albums/:albumId/photos' ,  component: PhotosComponent},
    { path: 'todos'                  ,  component: TodosComponent},
    { path: 'profile/:userId/todos'  ,  component: TodosComponent},
    { path: '',   pathMatch: 'full', redirectTo: 'posts'},
    { path: '**', pathMatch: 'full', redirectTo: 'posts'}
];

@NgModule({
    imports: [RouterModule.forRoot( ROUTES, { useHash: true } )],
    exports: [RouterModule]
})

export class AppRoutingModule { }