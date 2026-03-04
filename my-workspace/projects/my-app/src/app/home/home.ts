import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [RouterOutlet, RouterLink, TranslatePipe]
})
export class Home {
    protected readonly traslateSVC = inject(TranslateService)

  protected ChangeEnglish():void{
    this.traslateSVC.use('en')
  }

    protected ChangeItaliano():void{
    this.traslateSVC.use('it')
  }
}
