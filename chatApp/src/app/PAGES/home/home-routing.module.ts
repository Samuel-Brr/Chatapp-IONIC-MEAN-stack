import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/GUARDS/auth.guard';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'chats',
        children: [
          {
            path: '',
            loadChildren: () => import('./chats/chats.module').then(m => m.ChatsPageModule),
            canLoad:[AuthGuard]
          },
          {
            path: ':messageId',
            loadChildren: () => import('./chats/message/message.module').then(m => m.MessagePageModule),
            canLoad:[AuthGuard]
          }
        ]
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            loadChildren: () => import('./status/status.module').then(m => m.StatusPageModule),
            canLoad:[AuthGuard]
          },
        ]
      },
      {
        path: 'calls',
        children: [
          {
            path: '',
            loadChildren: () => import('./calls/calls.module').then(m => m.CallsPageModule),
            canLoad:[AuthGuard]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/tabs/chats',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/tabs/chats'
  },
  {
    path: 'status',
    loadChildren: () => import('../../PAGES/home/status/status.module').then( m => m.StatusPageModule)
  },
  {
    path: 'calls',
    loadChildren: () => import('../../PAGES/home/calls/calls.module').then( m => m.CallsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
