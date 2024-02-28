import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router';

export type menuItem = {
  icon: string,
  label: string,
  route: string
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  template: `
    <mat-nav-list>
      <a mat-list-item 
        *ngFor="let item of menuItems()" 
        [routerLink]="item.route"
        routerLinkActive
        #rla="routerLinkActive"
        [activated]="rla.isActive">

        <mat-icon matListItemIcon>{{item.icon}}</mat-icon>
        <span matListItemTitle>{{item.label}}</span>
      </a>
    </mat-nav-list>
  `,
  styles: ``
})
export class CustomSidenavComponent {
  menuItems = signal<menuItem[]>([{
    icon: 'dashboard',
    label: 'Dashboard',
    route: 'dashboard'
  },{
    icon: 'dashboard',
    label: 'Astroids',
    route: 'astroids'
  }])
}
