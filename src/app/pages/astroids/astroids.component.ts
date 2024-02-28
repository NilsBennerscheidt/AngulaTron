import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { NasaApiService } from '../../services/nasa-api.service';

@Component({
  selector: 'app-astroids',
  standalone: true,
  imports: [HttpClientModule],
  template: `
    <h1>Astroids</h1>
  `,
  styles: ``
})
export class AstroidsComponent implements OnInit {
  httpClient = inject(HttpClient);
  constructor(private nasaApiService: NasaApiService) { };

  ngOnInit(): void {
    this.getAstroids();
  }

  getAstroids() {
    // this.httpClient.get('https://api.nasa.gov/planetary/apod?api_key=4afUiazxfy8RpCk0v6ajGo4SC9FeI3GuZnOTl5Ty')
    // .subscribe((data)=>{
    //   console.log(data)
    // })
    this.nasaApiService.fetchData().subscribe((data) => {
      console.log(data);
    })
  }
}
