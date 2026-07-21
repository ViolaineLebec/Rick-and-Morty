import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiResponse } from '../../shared/types/api-response.types';
import { CharactersService } from '../characters/services/characters';
import { LocationsService } from '../locations/services/locations';
import { EpisodesService } from '../episodes/services/episodes';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {
  private charactersService = inject(CharactersService);
  private episodesService = inject(EpisodesService);
  private locationsService = inject(LocationsService);
  characterCount = signal<number>(1);
  episodeCount = signal<number>(1);
  locationCount = signal<number>(1);

  ngOnInit(): void {
    this.charactersService.getCharacterCount().subscribe({
      next: (data) => {
        this.characterCount.set(data.info.count);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des personnages:', err);
      }
    });
    this.locationsService.getLocationCount().subscribe({
      next: (data) => {
        this.locationCount.set(data.info.count);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des planètes :', err);
      }
    });
    this.episodesService.getEpisodeCount().subscribe({
      next: (data) => {
        this.episodeCount.set(data.info.count);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des épisodes:', err);
      }
    });
  }
}