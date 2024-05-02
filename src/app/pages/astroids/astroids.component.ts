import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, KeyValue, KeyValuePipe } from '@angular/common';
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
import { SortNeodPipe } from "../../pipes/sort-neod.pipe";
import { SortNeodByDatePipe } from "../../pipes/sort-neod-by-date.pipe";

@Component({
    selector: 'app-astroids',
    standalone: true,
    providers: [provideNativeDateAdapter()],
    templateUrl: './astroids.component.html',
    styleUrl: './astroids.component.scss',
    imports: [
        KeyValuePipe,
        HttpClientModule,
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        JsonPipe,
        SortNeodPipe,
        SortNeodByDatePipe
    ]
})



export class AstroidsComponent implements OnInit {
  httpClient = inject(HttpClient);
  neodRaw = <NEOFeedResponse>{};
  neodList = signal(<Array<NearEarthObjectFormatted>>[])
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(private nasaApiService: NasaApiService) { };

  ngOnInit(): void {
    const fromDate = new Date()
    var untilDate = new Date(fromDate);
    console.log('hi', this.neodList.length)
    untilDate.setDate(untilDate.getDate() + 7);
    this.range.setValue({start: fromDate, end: untilDate})
    
    this._getAstroids();
  }

  /**
   * Get the api Data
   */
  private _getAstroids() {
    this.nasaApiService.getAstroids(<Date>this.range.getRawValue().start, <Date>this.range.getRawValue().end).subscribe((data) => {
      this.neodRaw = <NEOFeedResponse>data
      this._prepareNeodData(<NEOFeedResponse>data);
    })
  }

  /**
   * We have to format the Data recived from the api 
   * @param pNeodData 
   */
  private _prepareNeodData(pNeodData: NEOFeedResponse) {
    let neodList: Array<NearEarthObjectFormatted[]> = [];

    // Convert the raw data into a usable Array
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

  public onDateChange(type: any, event: any){
    if(event.value){
      this.neodList.set([]);
      this._getAstroids();
    }
  }
}
