import { Component, OnInit, signal, inject } from '@angular/core';
import { Episode } from '../../types/episode.type';
import { EpisodeCard } from '../../components/episode-card/episode-card';
import { EpisodesService } from '../../services/episodes';
import { ApiResponse, InfoResponse } from '../../../../shared/types/api-response.types';
import { Pagination } from '../../components/pagination/pagination';

@Component({
  selector: 'app-episodes',
  imports: [EpisodeCard, Pagination],
  templateUrl: './episodes.html',
  styleUrl: './episodes.css',
})
export class Episodes implements OnInit {
  private readonly episodeService = inject(EpisodesService);
  readonly episodes = this.episodeService.episodeSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);
  currentPage = signal(1);
  totalPage = signal(0);

  ngOnInit() {
    // Method 1 : Do everything in the service
    this.episodeService.getEpisodesFromService().subscribe();
    // Method 2 : Get needed value in the component directly
    this.loadEpisodes();
  }

  loadEpisodes(page?: number) {
    this.currentPage.set(page ? page : 1);

    this.episodeService
      .getEpisodeFromComponent()
      .subscribe((response: ApiResponse<Episode[]>) => {
        this.infos.set(response.info);
        this.totalPage.set(this.infos().pages);
      });
  }

  changePage(page: number) {
    this.currentPage.set(page);
    this.episodeService.getEpisodesFromService(page).subscribe();
  }
}