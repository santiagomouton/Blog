import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

/* FormsModule */
import { ReactiveFormsModule } from '@angular/forms';

/* Routing */
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* Angular Flex Layout */
import { FlexLayoutModule } from '@angular/flex-layout';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* Components */
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { PostsComponent } from './components/posts/posts.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    PostsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AppRoutingModule
    //NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
