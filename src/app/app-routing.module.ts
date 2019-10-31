import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PrototypeComponent} from './prototype/prototype.component';
import {ExecComponent} from './exec/exec.component';


const routes: Routes = [

  {component: PrototypeComponent, path: 'prototype'},
  {component: ExecComponent, path: 'exec'}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
