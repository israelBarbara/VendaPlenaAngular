import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './Cliente/Components/clientes/clientes.component';
import { DividaComponent } from './Dividas/Components/divida/divida.component';

const routes: Routes = [
  {path:'clientes',component:ClientesComponent},
  {path:'dividas/:id',component: DividaComponent},
  {path:'',redirectTo:'clientes',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
