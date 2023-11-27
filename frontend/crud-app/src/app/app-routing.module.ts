import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpTableComponent } from './components/emp-table/emp-table.component';
import { CreateEmpDataComponent } from './components/create-emp-data/create-emp-data.component';

const routes: Routes = [
  {
    path: '',
    component: EmpTableComponent
  },
  {
    path: 'create',
    component: CreateEmpDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
