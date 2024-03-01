import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class NasaApiService {

  public baseUrl = "https://api.nasa.gov";
  private apiKey = "4afUiazxfy8RpCk0v6ajGo4SC9FeI3GuZnOTl5Ty"

  // httpClient = inject(HttpClient);

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  public fetchData() {
    return this.httpClient.get('https://api.nasa.gov/planetary/apod?api_key=' + this.apiKey)
  }
  public getAstroids(pDateFrom: Date, pDateUntil: Date) {
    const dateFrom: string = pDateFrom.toISOString().split('T')[0]
    const dateUntil: string = pDateUntil.toISOString().split('T')[0]

    return this.httpClient.get('https://api.nasa.gov/neo/rest/v1/feed?start_date=' + dateFrom + '&end_date=' + dateUntil + '&api_key=' + this.apiKey)
  }
}
