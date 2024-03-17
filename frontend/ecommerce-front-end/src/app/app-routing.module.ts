import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerRoutingModule } from './components/container/container-routing.module';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ContainerComponent } from './components/container/container.component';


const routes: Routes = [
  {path: '', component:ContainerComponent,loadChildren:()=> import("./components/container/container-routing.module").then(l=>l.ContainerRoutingModule)},
  // {path:'',redirectTo:'container',pathMatch:'full'},
  {path: 'forbidden', component:ForbiddenComponent},
  {path: '**', redirectTo:'',pathMatch:'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
