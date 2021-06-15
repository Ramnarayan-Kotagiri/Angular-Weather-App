import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  readonly PROXY_URL = 'https://api.allorigins.win/get?url='; //Pull contents from any page via API (as JSON/P or raw) and avoid Same-origin policy problems.
  readonly API_PROVIDER_URL = 'https://www.metaweather.com/api/';

  constructor(private http: HttpClient) { }

/**
 * @param query selected by user on search-bar.
 * @return the locations whose title match the query.
 */
  searchLocation(query: string): Observable<any> {
    if(query === ""){
      return of([])
    }
    const url = this.PROXY_URL + this.API_PROVIDER_URL + 'location/search/?query=' + query;
    return this.http.get(url).pipe(map((x: any) => JSON.parse(x.contents)),catchError((err) => {
      console.log('error caught in service');
      console.error(err);
      return throwError(err);
  }))
}

/**
 * @param woeid of location selected by the user from the drop-down.
 * @return weather forecast for the location.
 */
  fetchWeatherData(woeid: number): Observable<any> {
    const url = this.PROXY_URL.concat(this.API_PROVIDER_URL, 'location/', woeid.toString());
    return this.http.get(url).pipe(map((x: any) => JSON.parse(x.contents)),catchError((err) => {
      console.log('error caught in service');
      console.error(err);
      return throwError(err);
    }))
  }
}
