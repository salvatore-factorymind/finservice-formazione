import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoadingIndicator } from 'my-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, LoadingIndicator],
})
export class App {
  protected readonly title = signal('my-app');
}
