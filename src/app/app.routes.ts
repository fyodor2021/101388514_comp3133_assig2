import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { DetailsComponent } from './details/details.component';
export const routes: Routes = [
    {path:'', redirectTo:'home',pathMatch:'full'},
    {path:'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterationComponent},
    {path: 'add', component: AddemployeeComponent},
    {path: 'details', component: DetailsComponent},
];
