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
    const formatDate = (inputDate: Date) => {
      // Create a new Date object with the input date
      let date = new Date(inputDate);
  
      // Extract year, month, and day from the date
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
      let day = String(date.getDate()).padStart(2, '0');
  
      // Concatenate year, month, and day with hyphens to form the desired format
      return `${year}-${month}-${day}`;
  };

    const dateFrom: string = formatDate(pDateFrom)
    const dateUntil: string = formatDate(pDateUntil)
    return this.httpClient.get('https://api.nasa.gov/neo/rest/v1/feed?start_date=' + dateFrom + '&end_date=' + dateUntil + '&api_key=' + this.apiKey)
  }
}
