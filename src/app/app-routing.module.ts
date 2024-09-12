import { NoPreloading, PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationGuard } from './authentication.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { RemoveAccountComponent } from './pages/remove-account/remove-account.component';

const routes: Routes = [
    { path: '', redirectTo:"login", pathMatch:'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'main', component: AppMainComponent,canActivate: [AuthenticationGuard],
        children: [
            { 
                path: '', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
                canActivate: [AuthenticationGuard]
            },
            { 
                path: 'master', loadChildren: () => import('./pages/master/master.module').then(m => m.MasterModule),
                canActivate: [AuthenticationGuard] 
            },
            { 
                path: 'scheme', loadChildren: () => import('./pages/scheme/scheme.module').then(m => m.SchemeModule),
                canActivate: [AuthenticationGuard] 
            },
            { 
                path: 'user', loadChildren: () => import('./pages/user-config/user-config.module').then(m => m.UserConfigModule),
                canActivate: [AuthenticationGuard] 
            },
            {
                path: 'feedback', loadChildren: () => import('./pages/feedback/feedback.module').then(m => m.FeedbackModule),
                canActivate: [AuthenticationGuard]
            },
            {
                path: 'report', loadChildren: () => import('./pages/report/report.module').then(m => m.ReportModule),
                canActivate: [AuthenticationGuard]
            },
            { 
                path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
                canActivate: [AuthenticationGuard] 
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
        ]
    },
    { path: 'grivence-form', component: AppErrorComponent },
    { path: 'access', component: AppAccessdeniedComponent },
    { path: 'notfound', component: AppNotfoundComponent },
    { path: 'deative-account', component: RemoveAccountComponent },
    { path: '**', redirectTo: 'notfound' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [ AuthenticationGuard ]
})
export class AppRoutingModule {
}
