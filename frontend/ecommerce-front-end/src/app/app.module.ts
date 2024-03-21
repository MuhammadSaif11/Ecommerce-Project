import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContainerComponent } from './components/container/container.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { SharedModule } from './shared/shared.module';
import { ContainerModule } from './components/container/container.module';
import { AuthModule } from './components/container/components/auth/auth.module';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContainerComponent,
    ForbiddenComponent,
    AdminComponent,
    UserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContainerModule,
    AuthModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
