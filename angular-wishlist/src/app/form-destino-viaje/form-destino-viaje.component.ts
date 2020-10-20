import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { DestinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minLongitud = 3;
  searchResults: string[];

  constructor(private fb: FormBuilder) { 
    //inicializar
    this.onItemAdded = new EventEmitter();
    this.fg = this.fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['']
    }); //vinculacion con tag html
    // compose permite armar un array de vaidators ya sean por defecto o personalizados

    //observador de tipeo
    this.fg.valueChanges.subscribe((form: any) =>{
      console.log('cambio el formulario: ', form);
    })
  }

  ngOnInit(): void {
    //a medida que van tipenado el nombre levantamos el texto, fromEvent esta escuchando cada vez que se tipea en el form genera un observable de eventos de entrada
    
    let elemNombre = <HTMLTimeElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value), //cada elemento tiene un target que es la tecla y nos interesa el valor
        filter(text => text.length > 2), //filter tiene la condicion y si se cumple deja seguir, sion se cumple la condicion no sigua al siguiente operador
        debounceTime(200), //llega lo que teclea antes de 200 ml seg
        distinctUntilChanged(), //no llega lo que borra
        switchMap(() => ajax('/assets/datos.json')) //imitamos como si consultamos un webservice el texto que entra lo pasariamos al webservice para consultar, lo que hacemos ahora es consultar a un archivo en assets
      ).subscribe(ajaxResponse => {
        this.searchResults = ajaxResponse.response;
      })
  }

  guardar(nombre: string, url: string): boolean {
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidator(control: FormControl): { [s: string]: boolean } {
    const l = control.value.toString().trim().length;
    if (l > 0 && l < 5) {
      return { invalidNombre: true };  //invalidNombre coincide con el del form html hasError(invalidNombre)
    }
    return null;
  }

  //validador parametrizable
  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      const l = control.value.toString().trim().length;
      if (l > 0 && l < minLong) {
        return { minLongNombre: true };  //minLongNombre coincide con el del form html hasError(minLongNombre) minLong es el parametro que viene de minLongitud y se muestra en el form
      }
      return null;
    }
  }



}
