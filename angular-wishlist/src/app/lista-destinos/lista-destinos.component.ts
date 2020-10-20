import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { DestinosApiClient } from '../models/destinos-api-client.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  //destinos: DestinoViaje[];
  @Output() onItemAdded:EventEmitter<DestinoViaje>;
  updates: string[];

  constructor(public destinosApiClient:DestinosApiClient) { 
    //this.destinos = [];
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.destinosApiClient.subscribeOnchange((d: DestinoViaje) => {
      if (d != null) {
        this.updates.push('Se ha elegido a ' + d.nombre);
      }
    });
   }

  ngOnInit(): void {
  }

  /*
  guardar (nombre:string, url:string):boolean {
    this.destinos.push(new DestinoViaje(nombre, url)); //con push vamos agregando los elementos en el array de destinos
    console.log(this.destinos);
    return false;
  }
  */
  agregado(d: DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }


  elegido(e: DestinoViaje) {
    //desmarcar todos los demas en en array de elegidos
    //this.destinos.forEach(function (x) {x.setSelected(false); });
    //se marca el elegido
    //d.setSelected(true);
    /*this.destinosApiClient.getAll().forEach(x => x.setSelected(false));
    e.setSelected(true);*/
    this.destinosApiClient.elegir(e);
  }

}
