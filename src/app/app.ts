import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinner } from './shared/loading-spinner/loading-spinner';
import { LoadingService } from './core/services/loading';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingSpinner, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('salvafrigo-fe');

  private readonly loadingService = inject(LoadingService);
  loading$ = this.loadingService.loading$;
}