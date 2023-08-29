import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchemeListComponent } from './scheme-list/scheme-list.component';
import { SchemeAddComponent } from './scheme-add/scheme-add.component';

const routes: Routes = [
  {
    path: '',
    component: SchemeListComponent
  },
  {
    path: 'add',
    component: SchemeAddComponent
  },
  {
    path: 'add/:editId',
    component: SchemeAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchemeRoutingModule { }
