import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResultComponent} from "./components/result/result.component";

const routes: Routes = [
  {path: '', redirectTo : '/result', pathMatch : 'full'},
  {path: 'result', component : ResultComponent},
  {path: 'result/:title/:year', component : ResultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
