import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NavMobileContainer } from './nav.mobile.container';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ThemeResources } from '../../../../../constants/theme.resources';
import { MatButtonModule } from '@angular/material/button';

const MAT = [MatIconModule, MatButtonModule, MatDialogModule];

@Component({
  selector: 'rio-nav-container',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule, ...MAT],
  template: `
    <nav class="nav">
      <ul class="nav__container">
        <li>
          <button
            #menuTrigger
            (click)="openDialog()"
            mat-icon-button
            class="hamburguer"
            color="primary"
          >
            <mat-icon>menu</mat-icon>
          </button>
        </li>
        <li>
          <img
            routerLink="/"
            class="nav__container--img"
            [src]="themeResources?.logo?.url"
            [alt]="themeResources?.logo?.alt"
          />
        </li>
      </ul>
    </nav>
  `,
  styleUrl: './nav.container.scss',
})
export class NavContainer {
  themeResources: any;
  private isDarkMode = false;
  private resources = ThemeResources;
  private resourceActiveSubject = new BehaviorSubject<any>(null);
  public resourceActive$ = this.resourceActiveSubject.asObservable();
  private isBrowser: boolean;
  private accentColor = 'purple'; // valor por defecto
  private renderer: any; // Declaramos renderer como "any" para inicializarlo después

  constructor(
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(platformId); // Determina si estamos en el navegador

    // Inicializar el tema desde el almacenamiento
    if (this.isBrowser) {
      const savedThemeMode = localStorage.getItem('themeMode');
      const savedAccentColor = localStorage.getItem('accentColor');
      this.isDarkMode = savedThemeMode === 'dark';
      this.accentColor = savedAccentColor ? savedAccentColor : 'purple';
      this.applyTheme();
      this.getResources();
    }
  }

  applyTheme() {
    if (this.isBrowser && this.renderer) {
      // Verifica que renderer esté definido
      const mode = this.isDarkMode ? 'dark' : 'light';
      const theme = `${mode}-${this.accentColor}`;
      this.renderer.setAttribute(
        this.document.documentElement,
        'data-theme',
        theme
      );
    }
  }

  getResources(): void {
    const theme = this.isDarkMode ? 'dark' : 'light';
    this.resourceActiveSubject.next(this.resources[theme]);
  }

  openDialog() {
    const dc = new MatDialogConfig();
    dc.autoFocus = true;
    dc.height = '90vh';
    dc.width = '70%';
    dc.position = {
      left: '16px',
    };
    dc.minHeight = '95vh';
    this.dialog.open(NavMobileContainer, dc);
  }
}
