import { shareNgZone } from '@angular-architects/module-federation-tools';
import {Component, NgZone} from '@angular/core';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private ngZone: NgZone) {
    shareNgZone(ngZone);
  }
}
