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
import { UsersComponent } from './components/users/users.component';
import { AccessProtectGuard } from './access-protect.guard';


export const ROUTES: Routes = [
    { path: 'login'              ,  component: LoginComponent},
    { path: 'register'           ,  component: RegisterComponent},
    { path: 'posts'              ,  component: PostsComponent,  canActivate: [AccessProtectGuard]},
    { path: 'profile/:id/posts'  ,  component: PostsComponent,  canActivate: [AccessProtectGuard]},
    { path: 'post/:id'           ,  component: PostComponent,   canActivate: [AccessProtectGuard]},
    { path: 'profile/:id'        ,  component: ProfileComponent,canActivate: [AccessProtectGuard]},
    { path: 'users'              ,  component: UsersComponent,  canActivate: [AccessProtectGuard]},
    { path: 'profile/:id/albums' ,  component: AlbumsComponent, canActivate: [AccessProtectGuard]},
    { path: 'albums'             ,  component: AlbumsComponent, canActivate: [AccessProtectGuard]},
    { path: 'albums/:id/photos'  ,  component: PhotosComponent, canActivate: [AccessProtectGuard]},
    { path: 'todos'              ,  component: TodosComponent,  canActivate: [AccessProtectGuard]},
    { path: 'profile/:id/todos'  ,  component: TodosComponent,  canActivate: [AccessProtectGuard]},
    { path: '',   pathMatch: 'full', redirectTo: 'login'},
    { path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
    imports: [RouterModule.forRoot( ROUTES, { useHash: true } )],
    exports: [RouterModule]
})

export class AppRoutingModule { }