import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  imports: [TranslateModule]
})
export class Footer {
  public readonly textKey = input.required<string>();
}
