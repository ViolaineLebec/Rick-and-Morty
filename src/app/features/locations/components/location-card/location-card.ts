import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Location } from '../../types/location.type';
import { NgClass } from '@angular/common';
import { CharactersService } from '../../../characters/services/characters';
import { Character } from '../../../characters/types/character.type';

@Component({
  selector: 'app-location-card',
  imports: [NgClass],
  templateUrl: './location-card.html',
  styleUrl: './location-card.css',
})
export class LocationCard implements OnInit{
  characterService = inject(CharactersService);
  location = input.required<Location>();
  residents = signal<Character[]>([]);

  ngOnInit(){
    
  }

  getCharacter(){
const residentUrls = this.location().residents || [];

        residentUrls.forEach((url) => {
          this.characterService.getCharacterByUrl(url).subscribe((character: Character) => {
            this.residents.update((prev) => [...prev, character]);
          });
        });
  }
}
