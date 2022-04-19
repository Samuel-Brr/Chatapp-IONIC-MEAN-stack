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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
