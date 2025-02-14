import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeResources } from '../constants/theme.resources';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private isDarkMode = false;
  private isBrowser: boolean;
  private accentColor = 'purple'; // valor por defecto
  private renderer: any; // Declaramos renderer como "any" para inicializarlo después
  private resources = ThemeResources;
  private resourceActiveSubject = new BehaviorSubject<any>(null);
  public resourceActive$ = this.resourceActiveSubject.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(platformId); // Determina si estamos en el navegador

    // Inicializar el tema desde el almacenamiento
    if (this.isBrowser) {
      const savedThemeMode = localStorage.getItem('themeMode');
      const savedAccentColor = localStorage.getItem('accentColor');
      this.isDarkMode = (savedThemeMode === 'dark');
      this.accentColor = savedAccentColor ? savedAccentColor : 'purple';
      this.applyTheme();
      this.getResources();
    }
  }

  setRenderer(renderer: any) {
    this.renderer = renderer;
    this.applyTheme(); // Aplica el tema inicial
  }

  toggleTheme() {
    if (this.isBrowser) {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('themeMode', this.isDarkMode ? 'dark' : 'light');
      localStorage.setItem('accentColor', this.accentColor);
      this.applyTheme();
      this.getResources();  // Actualiza los recursos cuando el tema cambie
    }
  }

  applyTheme() {
    if (this.isBrowser && this.renderer) { // Verifica que renderer esté definido
      const mode = this.isDarkMode ? 'dark' : 'light';
      const theme = `${mode}-${this.accentColor}`;
      this.renderer.setAttribute(this.document.documentElement, 'data-theme', theme);
    }
  }

  getResources(): void {
    const theme = this.isDarkMode ? 'dark' : 'light';
    this.resourceActiveSubject.next(this.resources[theme]);
  }

  setAccentColor(color: string) {
    this.accentColor = color;
    // Actualiza localStorage si lo deseas
    localStorage.setItem('accentColor', color);
    // Vuelve a aplicar el tema (para que ponga data-theme correcto)
    this.applyTheme();
  }
}
