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
    <h1>Apod: {{apod().title}}</h1>
    <div class="apodContainer">
      <div class="apodContainerInner">
        <img class="apodImg" src="{{apod().url}}">
        <p class="apodDescription">
          <strong>Description:<br></strong>
          {{apod().explanation}}
        </p>
      </div>
    </div>

  `,
  styles: `
    .apodContainer{
      width: 100%;
      display: flex;
      justify-content: center;
    };
    .apodContainerInner{
      width: 80dvw;
      max-width: 800px;
    };
    .apodImg{
      margin-top: 50px;
      width: 100%;
    };
    .apodDescription{
      margin-top: 15px;
    }
  `
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
