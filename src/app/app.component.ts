import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WeatherApp';
  query = '';
  city: any;
  locationForecast: any[] = [];
  timezone = ''
  weatherToday:any;

  constructor(
    private weatherService: WeatherService
  ) {}


  search = (text$: Observable<string>) => {
    return text$.pipe(      
        debounceTime(200), 
        distinctUntilChanged(),
        switchMap( (text) =>  this.weatherService.searchLocation(text) ),
        catchError(() => {
          return of([]);
        }))              
  }

  formatter = (result:any) => result.title;

  selectedItem(item:any){
    this.city=item.item;
    this.weatherService.fetchWeatherData1(this.city.woeid).subscribe((data: any) => {
      if (data) {
        this.locationForecast = data.consolidated_weather;
        this.weatherToday = data.consolidated_weather[0];
        this.timezone = data.timezone
      }
    });
  }
}
