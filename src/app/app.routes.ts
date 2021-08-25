import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { PostComponent } from './components/post/post.component';


export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'post/:id', component: PostComponent},
    { path: '',   pathMatch: 'full', redirectTo: 'home'},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot( ROUTES, { useHash: true } )],
    exports: [RouterModule]
})

export class AppRoutingModule { }