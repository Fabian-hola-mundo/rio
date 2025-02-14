import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NavContainer } from "../module/nav/container/nav.container";

@Component({
  standalone: true,
  styleUrl: './layout.container.scss',
  imports: [
    RouterModule,
    MatButtonModule,
    CommonModule,
    NavContainer
],
  template: `
  <rio-nav-container/>
  <router-outlet></router-outlet>
  <h1>LayOut Container Footer</h1>
  `,
})
export class LayoutContainer {
  isScrolledHalfway: boolean = false;
  isScrollingUp = true;
  lastScrollPosition = 0;
  scrollThreshold = 200; // Threshold for small scroll (in pixels)

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollPosition = window.scrollY || 0;

    // Check scroll direction
    this.isScrollingUp = currentScrollPosition < this.lastScrollPosition;

    // Detect if the user has scrolled past the threshold
    if (currentScrollPosition > this.scrollThreshold) {
      this.isScrolledHalfway = true;
    } else {
      this.isScrolledHalfway = false;
    }

    // Update the last scroll position
    this.lastScrollPosition = currentScrollPosition;
  }
}
