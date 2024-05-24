import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './pages/components/loginUser/loginUser.component';

const routes: Routes = [
  {path: 'pages', loadChildren: () => import('./pages/pages.module').then(module => module.PagesModule)},
  { path: 'logins', component: LoginUserComponent},
  // { path: '', redirectTo: '/logins', pathMatch: 'full' }, // Thêm dòng này để mặc định chuyển hướng đến trang login
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
