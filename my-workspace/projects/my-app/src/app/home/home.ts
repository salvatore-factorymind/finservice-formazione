import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { Footer } from '../shared/components/footer/footer';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [RouterOutlet, RouterLink, TranslatePipe, Footer, RouterLinkActive]
})
export class Home {
  protected readonly traslateSVC = inject(TranslateService);

  protected isShown = signal(false);

  protected ChangeEnglish(): void {
    this.traslateSVC.use('en');
  }

  protected ChangeItaliano(): void {
    this.traslateSVC.use('it');
  }

  protected openMenu(){
    this.isShown.update((isShown) => !isShown);
  }
}
