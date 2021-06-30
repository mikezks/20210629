import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit {
  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Stream 3: Result Stream for the Template
    this.flights$ =
      // Stream 1: Input field value changes
      // Trigger
      // Data provider
      this.control.valueChanges.pipe(
        // Filter START
        filter(city => city.length > 2),
        debounceTime(300),
        distinctUntilChanged(),
        // Filter END
        // Side-effect: Assigning a class property
        tap(() => this.loading = true),
        // Integrate 2nd Stream
        switchMap(city => this.load(city)),
        tap(() => this.loading = false)
      );
  }

  // Stream 2: Http data request
  load(from: string): Observable<Flight[]>  {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }
}
