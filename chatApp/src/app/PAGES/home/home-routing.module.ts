import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
            loadChildren: () => import('./chats/chats.module').then(m => m.ChatsPageModule)
          },
          {
            path: ':messageId',
            loadChildren: () => import('./chats/message/message.module').then(m => m.MessagePageModule)
          }
        ]
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            loadChildren: () => import('./status/status.module').then(m => m.StatusPageModule)
          },
        ]
      },
      {
        path: 'calls',
        children: [
          {
            path: '',
            loadChildren: () => import('./calls/calls.module').then(m => m.CallsPageModule)
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
