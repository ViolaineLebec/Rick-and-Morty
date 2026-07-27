import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { Character } from '../types/character.type';
import { ApiResponse, InfoResponse } from '../../../shared/types/api-response.types';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private readonly http = inject(HttpClient);
  private characters = signal<Character[]>([]);
  readonly characterSignal = this.characters.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/character/';


  getCharactersFromService(page: number = 1, filters: { name?: string; status?: string; gender?: string; species?: string } = {}): Observable<ApiResponse<Character[]>> {
    let params = new HttpParams().set('page', page);
    if (filters.name?.trim()) params = params.set('name', filters.name.trim());
  if (filters.status) params = params.set('status', filters.status);
  if (filters.gender) params = params.set('gender', filters.gender);
  if (filters.species) params = params.set('species', filters.species);
    
    return this.http
      .get<ApiResponse<Character[]>>(this.url, {params})
      .pipe(tap((response: ApiResponse<Character[]>) => this.characters.set(response.results)));
  }

  getCharacterFromComponent(page: number = 1): Observable<ApiResponse<Character[]>> {
    return this.http.get<ApiResponse<Character[]>>(this.url, {
      params: { page: page },
    });
  }

  getCharacterByUrl(url: string){
    return this.http.get<Character>(url);
  }

  getCharacterCount(){
    return this.http.get<ApiResponse<Character>>(this.url);
  }
}
