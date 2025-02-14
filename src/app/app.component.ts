import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Rio.Web.Ui';

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2 // Inyectamos Renderer2 en el componente
  ) {
  }

  ngOnInit(): void {
    // Inicializa el renderer en ThemeService
    this.themeService.setRenderer(this.renderer);
    this.themeService.applyTheme()
  }
}
