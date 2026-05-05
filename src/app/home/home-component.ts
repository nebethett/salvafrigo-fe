import { Component, inject, signal } from '@angular/core';
import { LoadingService } from '../core/services/loading';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {

  private readonly loadingService = inject(LoadingService);

  username : string = '';
  password: string = '';
  errorMessage= signal('');
  hasErrorAuth = signal(false);

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    this.errorMessage.set('');
    this.hasErrorAuth.set(false);
    this.loadingService.show();

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.loadingService.hide();
        this.navigateToRicercaRicette();
      },
      error: () => {
        this.loadingService.hide();
        this.errorMessage.set('Credenziali non valide');
        this.hasErrorAuth.set(true);
      }
    });
  }

  navigateToRicercaRicette(): void {

      this.router.navigate(['/ricette']);
  }

}
