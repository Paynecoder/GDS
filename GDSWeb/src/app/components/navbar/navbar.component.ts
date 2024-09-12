// Author: Joshua Payne
import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  mobileMenuActive = false;

  // Swaps boolean value for mobile menu
  toggleMobileMenu(): void {
    this.mobileMenuActive = !this.mobileMenuActive;
  }

}
