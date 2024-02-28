import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { NasaApiService } from '../../services/nasa-api.service';

export type apod = {
  copyright: string
  date: string
  explanation:string
  hdurl:string
  media_type: string
  service_version: string
  title: string
  url: string
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule],
  template: `
    <h1>Dashboard</h1>
    <img src="{{apod().url}}">

  `,
  styles: ``
})
export class DashboardComponent {
  httpClient = inject(HttpClient);
  apod = signal(<apod>{});

  constructor(private nasaApiService: NasaApiService) { };

  ngOnInit(): void {
    this.getAstroids();
  }

  getAstroids() {

    this.nasaApiService.fetchData().subscribe((data: any) => {
      this.apod.set(data)
      console.log(data)
    })
  }
}
