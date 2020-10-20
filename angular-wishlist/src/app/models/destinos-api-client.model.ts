import { BehaviorSubject, Subject } from 'rxjs';
import { DestinoViaje } from './destino-viaje.model';

export class DestinosApiClient {
	destinos:DestinoViaje[];
	current: Subject <DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

	constructor() {
       this.destinos = [];
	}
	add(d:DestinoViaje){
	  this.destinos.push(d);
	}
	getAll(){
	  return this.destinos;
	}
	getById(id:string):DestinoViaje{
		return this.filter(function(d){return d.tostring() === id;})[0];
	}
	filter(arg0: (d: any) => boolean) {
		throw new Error('Method not implemented.');
	}
	elegir(d: DestinoViaje) {
		this.destinos.forEach(x => x.setSelected(false));
		d.setSelected(true);
		this.current.next(d);
	}
	subscribeOnchange(fn) {
		this.current.subscribe(fn);
	}
}