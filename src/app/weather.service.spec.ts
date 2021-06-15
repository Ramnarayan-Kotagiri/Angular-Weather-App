import { inject, TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;
  let PROXY_URL = 'https://api.allorigins.win/get?url='; //Pull contents from any page via API (as JSON/P or raw) and avoid Same-origin policy problems.
  let API_PROVIDER_URL = 'https://www.metaweather.com/api/';

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [WeatherService]
    });

    service = TestBed.get(WeatherService)
    httpMock = TestBed.get(HttpTestingController)
  }); 

  it('should be created', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy()
  }))

  it('should get initialized', () => {
    expect(service).toBeDefined()
  })

  describe('searchLocation', () => {
    it('should fetch matching locations for the given user query', () => {
      const dummyResponse = {"contents":"[{\"title\":\"London\",\"location_type\":\"City\",\"woeid\":44418,\"latt_long\":\"51.506321,-0.12714\"}]","status":{"url":"https://www.metaweather.com/api/location/search/?query=london","content_type":"application/json","content_length":90,"http_code":200,"response_time":267}}

        service.searchLocation('london').subscribe((resp) => {
          expect(JSON.parse(resp)).toEqual(dummyResponse)
          expect(JSON.parse(resp)['status']).toEqual({
            "url": "https://www.metaweather.com/api/location/search/?query=london",
            "content_type": "application/json",
            "content_length": 90,
            "http_code": 200,
            "response_time": 267
          })
        })

        const req = httpMock.expectOne(PROXY_URL + API_PROVIDER_URL + 'location/search/?query=london');
        expect(req.request.method).toBe('GET')
        req.flush(dummyResponse)
    })
  })

  describe('fetchWeatherData', () => {
    it('should fetch the weather forecast details for the selected location.', () => {
      const dummyResponse = {"contents":"{\"consolidated_weather\":[{\"id\":6553884861399040,\"weather_state_name\":\"Heavy Cloud\",\"weather_state_abbr\":\"hc\",\"wind_direction_compass\":\"ENE\",\"created\":\"2021-06-15T12:32:01.856274Z\",\"applicable_date\":\"2021-06-15\",\"min_temp\":14.879999999999999,\"max_temp\":26.135,\"the_temp\":23.525,\"wind_speed\":3.856766386569103,\"wind_direction\":57.50678615992829,\"air_pressure\":1021.5,\"humidity\":52,\"visibility\":9.891918694822238,\"predictability\":71},{\"id\":6173820521021440,\"weather_state_name\":\"Showers\",\"weather_state_abbr\":\"s\",\"wind_direction_compass\":\"SSW\",\"created\":\"2021-06-15T12:32:03.168805Z\",\"applicable_date\":\"2021-06-16\",\"min_temp\":15.254999999999999,\"max_temp\":29.14,\"the_temp\":28.115000000000002,\"wind_speed\":4.6931988984914765,\"wind_direction\":198.5106662590445,\"air_pressure\":1011.5,\"humidity\":45,\"visibility\":12.36435466873459,\"predictability\":73},{\"id\":5440470088941568,\"weather_state_name\":\"Light Rain\",\"weather_state_abbr\":\"lr\",\"wind_direction_compass\":\"NNW\",\"created\":\"2021-06-15T12:32:03.181129Z\",\"applicable_date\":\"2021-06-17\",\"min_temp\":16.16,\"max_temp\":20.685,\"the_temp\":20.095,\"wind_speed\":5.416953712200748,\"wind_direction\":342.75439754914066,\"air_pressure\":1010.5,\"humidity\":81,\"visibility\":9.4019675097431,\"predictability\":75},{\"id\":5063399005224960,\"weather_state_name\":\"Heavy Rain\",\"weather_state_abbr\":\"hr\",\"wind_direction_compass\":\"NNE\",\"created\":\"2021-06-15T12:32:01.787272Z\",\"applicable_date\":\"2021-06-18\",\"min_temp\":12.84,\"max_temp\":15.8,\"the_temp\":15.035,\"wind_speed\":8.600315766637504,\"wind_direction\":25.832745069301428,\"air_pressure\":1015.0,\"humidity\":82,\"visibility\":6.401676708025133,\"predictability\":77},{\"id\":4887551098748928,\"weather_state_name\":\"Light Rain\",\"weather_state_abbr\":\"lr\",\"wind_direction_compass\":\"NE\",\"created\":\"2021-06-15T12:32:02.881436Z\",\"applicable_date\":\"2021-06-19\",\"min_temp\":11.27,\"max_temp\":18.63,\"the_temp\":17.865000000000002,\"wind_speed\":5.144586007826294,\"wind_direction\":46.08511888616599,\"air_pressure\":1016.0,\"humidity\":64,\"visibility\":14.005395987433388,\"predictability\":75},{\"id\":6640614746619904,\"weather_state_name\":\"Heavy Rain\",\"weather_state_abbr\":\"hr\",\"wind_direction_compass\":\"SSW\",\"created\":\"2021-06-15T12:32:04.551790Z\",\"applicable_date\":\"2021-06-20\",\"min_temp\":13.03,\"max_temp\":17.835,\"the_temp\":16.52,\"wind_speed\":5.141099379623001,\"wind_direction\":197.0,\"air_pressure\":1006.0,\"humidity\":81,\"visibility\":9.758013202895093,\"predictability\":77}],\"time\":\"2021-06-15T16:27:52.525518+01:00\",\"sun_rise\":\"2021-06-15T04:42:44.508559+01:00\",\"sun_set\":\"2021-06-15T21:19:35.668898+01:00\",\"timezone_name\":\"LMT\",\"parent\":{\"title\":\"England\",\"location_type\":\"Region / State / Province\",\"woeid\":24554868,\"latt_long\":\"52.883560,-1.974060\"},\"sources\":[{\"title\":\"BBC\",\"slug\":\"bbc\",\"url\":\"http://www.bbc.co.uk/weather/\",\"crawl_rate\":360},{\"title\":\"Forecast.io\",\"slug\":\"forecast-io\",\"url\":\"http://forecast.io/\",\"crawl_rate\":480},{\"title\":\"HAMweather\",\"slug\":\"hamweather\",\"url\":\"http://www.hamweather.com/\",\"crawl_rate\":360},{\"title\":\"Met Office\",\"slug\":\"met-office\",\"url\":\"http://www.metoffice.gov.uk/\",\"crawl_rate\":180},{\"title\":\"OpenWeatherMap\",\"slug\":\"openweathermap\",\"url\":\"http://openweathermap.org/\",\"crawl_rate\":360},{\"title\":\"Weather Underground\",\"slug\":\"wunderground\",\"url\":\"https://www.wunderground.com/?apiref=fc30dc3cd224e19b\",\"crawl_rate\":720},{\"title\":\"World Weather Online\",\"slug\":\"world-weather-online\",\"url\":\"http://www.worldweatheronline.com/\",\"crawl_rate\":360}],\"title\":\"London\",\"location_type\":\"City\",\"woeid\":44418,\"latt_long\":\"51.506321,-0.12714\",\"timezone\":\"Europe/London\"}","status":{"url":"https://www.metaweather.com/api/location/44418","content_type":"application/json","content_length":3539,"http_code":200,"response_time":751}}

      service.fetchWeatherData(44418).subscribe((resp) => {
        expect(JSON.parse(resp)).toEqual(dummyResponse)
      })

      const req = httpMock.expectOne(PROXY_URL + API_PROVIDER_URL + 'location/44418');
      expect(req.request.method).toBe('GET')
      req.flush(dummyResponse);
    })
  })


});
