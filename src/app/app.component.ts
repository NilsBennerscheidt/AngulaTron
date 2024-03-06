import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'

import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent 
  ],
  templateUrl: './app.component.html',
  
})
export class AppComponent {
  title = 'AngulaTron';

  collapsed = signal(true)

  sidenavWidth = computed(() => this.collapsed() ? '60px': '250px')
}
