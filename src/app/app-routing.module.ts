import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { UserComponent } from './user/user.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { ElvesComponent } from './elves/elves.component';
import { HatComponent } from './hat/hat.component';


const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'elves', component: ElvesComponent },
    { path: 'signin', component: SigninComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent,  resolve: { data: UserResolver }},
    { path: '**', component: HatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
