import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PrototypeComponent} from './prototype/prototype.component';


const routes: Routes = [

  {component: PrototypeComponent, path: 'prototype'}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
