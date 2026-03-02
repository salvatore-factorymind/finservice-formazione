import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [RouterOutlet, RouterLink]
})
export class Home {
}