import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
        title: "EARN"
      },
      {
        path: 'blog',
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
        title: "EARN / Comunicados"
      },
      {
        path: 'blog/:blog',
        loadChildren: () => import('./new/new.module').then(m => m.NewModule),
        title: "EARN / Comunicado"
      },
      {
        path: 'contacto',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
        title: "EARN / Contacto"
      },
      {
        path: 'aviso-de-privacidad',
        loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyModule),
        title: "EARN / Aviso de privacidad"
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
