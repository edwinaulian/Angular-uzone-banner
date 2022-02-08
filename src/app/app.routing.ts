import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page';
import { ContentComponent } from './components/main-content/uzone-content.component';

const ROUTES: Route[] = [
  {
    path: '',
    component: ContentComponent,
    pathMatch: 'prefix',
  },
  {
    path: 'paket-wisata/:id',
    component: ContentComponent,
    children: [
      {
        path: 'order',
        component: ContentComponent
      },
      {
        path: 'payment',
        component: ContentComponent
      },
      {
        path: 'payment-creditcard',
        component: ContentComponent
      },
      {
        path: 'waiting',
        component: ContentComponent
      },
      {
        path: 'proses',
        component: ContentComponent,
      },
      {
        path: 'cekstatus',
        component: ContentComponent
      },
      {
        path: 'etiket',
        component: ContentComponent
      },
      {
        path: 'Pesanan',
        component: ContentComponent
      },
      {
        path: 'paymentfailed',
        component: ContentComponent
      },
      {
        path: 'term-condition',
        component: ContentComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRouting {}
