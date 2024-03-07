import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { NasaApiService } from '../../services/nasa-api.service';
import { NEOFeedResponse, NearEarthObject, NearEarthObjectFormatted } from '../../interfaces/neod';

@Component({
  selector: 'app-astroids',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './astroids.component.html',
  styleUrl: './astroids.component.scss'
})



export class AstroidsComponent implements OnInit {
  httpClient = inject(HttpClient);
  neodRaw = <NEOFeedResponse>{};
  neodList = signal(<Array<NearEarthObjectFormatted>>[])
  dates = [new Date('2024-02-29'), new Date('2024-02-29')];

  constructor(private nasaApiService: NasaApiService) { };

  ngOnInit(): void {
    this.dates = [new Date('2024-02-29'), new Date('2024-03-01')];
    this.getAstroids();
  }

  /**
   * Get the api Data
   */
  getAstroids() {
    this.nasaApiService.getAstroids(this.dates[0], this.dates[this.dates.length - 1]).subscribe((data) => {
      this.neodRaw = <NEOFeedResponse>data
      this.prepareNeodData(<NEOFeedResponse>data);
    })
  }

  /**
   * We have to format the Data recived from the api 
   * @param pNeodData 
   */
  private prepareNeodData(pNeodData: NEOFeedResponse) {
    let neodList: Array<NearEarthObjectFormatted[]> = [];
    this.dates.forEach((pElement: Date) => {
      const dynamicDateKey: string = pElement.toISOString().split('T')[0]
      try {
        const dailyNeod: any = {
          date: dynamicDateKey,
          data: pNeodData.near_earth_objects[dynamicDateKey]
        } 
        
        neodList.push(dailyNeod)
      } catch (error) {
        throw (error);
      }
    })
    console.log(neodList)
    this.neodList.set(<any>neodList)
  }
}
