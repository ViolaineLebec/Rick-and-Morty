import { Component, OnInit, signal, inject } from '@angular/core';
import { Character } from '../../types/character.type';
import { CharacterCard } from '../../components/character-card/character-card';
import { CharactersService } from '../../services/characters';
import { ApiResponse, InfoResponse } from '../../../../shared/types/api-response.types';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-characters',
  imports: [CharacterCard, Pagination, FormsModule],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters implements OnInit {
  private readonly characterService = inject(CharactersService);
  readonly characters = this.characterService.characterSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);
  currentPage = signal(1);
  totalPage = signal(0);
  searchQuery = signal<string>('');
selectedStatus = signal<string>('');
  selectedGender = signal<string>('');
  selectedSpecies = signal<string>('');


  ngOnInit() {
    // Method 1 : Do everything in the service
    // this.characterService.getCharactersFromService().subscribe();
    // Method 2 : Get needed value in the component directly
    this.loadCharacters(1);
  }

  loadCharacters(page: number = 1) {
    this.currentPage.set(page);
    const filters = {
      name: this.searchQuery(),
      status: this.selectedStatus(),
      gender: this.selectedGender(),
      species: this.selectedSpecies(),
    };

    this.characterService
      .getCharactersFromService(page, filters)
      .subscribe({
        next: (response: ApiResponse<Character[]>) => {
          this.infos.set(response.info);
          this.totalPage.set(response.info.pages);
        },
        error: () => {
          this.totalPage.set(0);
        }
      });
    }

    onFilterChange() {
      this.loadCharacters(1);
    }

    changePage(page: number) {
      this.loadCharacters(page);
    }
  
}
