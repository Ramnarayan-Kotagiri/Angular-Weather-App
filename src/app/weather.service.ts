import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  readonly CORS_PROXY_URL = 'https://api.allorigins.win/get?url=';
  readonly API_PROVIDER_URL = 'https://www.metaweather.com/api/';

  constructor(private http: HttpClient) { }

  searchLocation(query: string): Observable<any> {
    if(query === ""){
      return of([])
    }
    const url = this.CORS_PROXY_URL + this.API_PROVIDER_URL + 'location/search/?query=' + query;
    return this.http.get(url).pipe(map((x: any) => JSON.parse(x.contents)));
  }

  fetchWeatherData1(woeid: number): Observable<any> {
    const url = this.CORS_PROXY_URL.concat(this.API_PROVIDER_URL, 'location/', woeid.toString());
    return this.http.get(url).pipe(map((x: any) => JSON.parse(x.contents)));
  }
}
