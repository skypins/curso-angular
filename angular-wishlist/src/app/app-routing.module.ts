import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: ListaDestinosComponent},
  { path: 'destino', component: DestinoDetalleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
