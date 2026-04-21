import { Component, inject } from '@angular/core';
import { LoadingService } from '../core/services/loading';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  standalone: true,
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {

  private readonly loadingService = inject(LoadingService);

  constructor(private router: Router) {}

  navigateToRicercaRicette(): void {
    this.loadingService.show();

    setTimeout(() => {
      this.router.navigate(['/ricette']);
      this.loadingService.hide();
    }, 2000);
  }

}
