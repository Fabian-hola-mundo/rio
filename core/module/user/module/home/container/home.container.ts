import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    CommonModule,
  ],
  template: `
  <h1>Home Container Works</h1>
  `,
})
export class HomeContainer {

}
