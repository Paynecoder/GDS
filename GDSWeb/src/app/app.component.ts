// Author: Joshua Payne
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet , RouterModule} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GDSWeb';
}
