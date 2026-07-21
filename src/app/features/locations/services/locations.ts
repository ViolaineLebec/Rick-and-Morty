import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Location } from '../types/location.type';
import { ApiResponse } from '../../../shared/types/api-response.types';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private readonly http = inject(HttpClient);
  private locations = signal<Location[]>([]);
  readonly locationSignal = this.locations.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/location/';

  getLocationsFromService(page: number = 1): Observable<ApiResponse<Location[]>> {
    return this.http
      .get<ApiResponse<Location[]>>(this.url, {
        params: { page: page },
      })
      .pipe(tap((response: ApiResponse<Location[]>) => this.locations.set(response.results)));
  }

  getLocationFromComponent(page: number = 1): Observable<ApiResponse<Location[]>> {
    return this.http.get<ApiResponse<Location[]>>(this.url, {
      params: { page: page },
    });
  }

   getLocationCount(){
      return this.http.get<ApiResponse<Location>>(this.url);
    }
  
}
