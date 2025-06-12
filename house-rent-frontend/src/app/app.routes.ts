import { Routes } from '@angular/router';
import { LoginComponent } from './page/auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './page/profile/profile.component';
import { MyPropertyComponent } from './page/my-property/my-property.component';
import { UnlockPropertyComponent } from './page/unlock-property/unlock-property.component';
import { PurchaseHistoryComponent } from './page/purchase-history/purchase-history.component';
import { BuyPackageComponent } from './page/buy-package/buy-package.component';
import { PostPropertyComponent } from './page/post-property/post-property.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManagePostComponent } from './admin/manage-post/manage-post.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { ManagePackagesComponent } from './admin/manage-packages/manage-packages.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { authGuard } from './core/guard/auth.guard';
import { UserDashboardComponent } from './page/user-dashboard/user-dashboard.component';
import { LauncherDashboardComponent } from './launcher-dashboard/launcher-dashboard.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'launcher', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'launcher', component: LauncherDashboardComponent },

  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    data: { roles: ['user'] },
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'my-property', component: MyPropertyComponent },
      { path: 'unlock-property', component: UnlockPropertyComponent },
      { path: 'purchase-history', component: PurchaseHistoryComponent },
      { path: 'buy-package', component: BuyPackageComponent },
      { path: 'post-property', component: PostPropertyComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    data: { roles: ['admin'] },
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'manage-packages', component: ManagePackagesComponent },
      { path: 'manage-post', component: ManagePostComponent },
      { path: 'manage-user', component: ManageUserComponent },
      { path: 'admin-list', component: AdminListComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'launcher' },
];
