import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { NasaApiService } from '../../services/nasa-api.service';
import { NEOFeedResponse, NearEarthObject, NearEarthObjectFormatted } from '../../interfaces/neod';

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
 

import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import { start } from 'repl';

@Component({
  selector: 'app-astroids',
  standalone: true,
  imports: [HttpClientModule, CommonModule,MatInputModule, MatFormFieldModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe],
  providers: [provideNativeDateAdapter()],
  templateUrl: './astroids.component.html',
  styleUrl: './astroids.component.scss'
})



export class AstroidsComponent implements OnInit {
  httpClient = inject(HttpClient);
  neodRaw = <NEOFeedResponse>{};
  neodList = signal(<Array<NearEarthObjectFormatted>>[])
  dates = [new Date('2024-02-29'), new Date('2024-02-29')];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(private nasaApiService: NasaApiService) { };

  ngOnInit(): void {
    const fromDate = new Date()
    var untilDate = new Date(fromDate);
    untilDate.setDate(untilDate.getDate() + 7);
    this.range.setValue({start: fromDate, end: untilDate})
    
    this.getAstroids();
  }

  /**
   * Get the api Data
   */
  getAstroids() {
    this.nasaApiService.getAstroids(<Date>this.range.getRawValue().start, <Date>this.range.getRawValue().end).subscribe((data) => {
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

    for (const [key, value] of Object.entries(pNeodData.near_earth_objects)) { 
      try {
        const dailyNeod: any = {
          date: key,
          data: value
        }

        neodList.push(dailyNeod)
      } catch (error) {
        throw (error);
      }
    }
    
    this.neodList.set(<any>neodList)
  }
}
