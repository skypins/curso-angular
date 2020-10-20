import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-wishlist';
  //definimos time para que quede observendo los cambios, seteamos que observe cada un segundo y muestra la hora con seg
  time = new Observable(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
}
