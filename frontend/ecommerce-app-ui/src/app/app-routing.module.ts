import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ContainerComponent } from './components/container/container.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { canActivate } from './auth/auth.guard';


const routes: Routes = [
  {path: '', component:ContainerComponent,loadChildren:()=> import("./components/container/container-routing.module").then(l=>l.ContainerRoutingModule)},
  {path: 'forbidden', component:ForbiddenComponent},
  {path: 'user', component:UserComponent,canActivate:[canActivate],data:{roles:["ROLE_USER"]}},
  {path: 'admin', component:AdminComponent,canActivate:[canActivate],data:{roles:["ROLE_ADMIN"]}},
  {path: '**', redirectTo:'',pathMatch:'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
