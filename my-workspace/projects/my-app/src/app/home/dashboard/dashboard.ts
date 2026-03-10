import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { UnionService } from '../../shared/service/union.service';

@Component({
  selector: 'app-dashboard',
  imports: [TranslatePipe],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  protected readonly unionsSvc = inject(UnionService);
  
  protected totalHour(): number{
    let sumHour = 0;
    const union = this.unionsSvc.Union();
    for(let i = 0; i < union.length; i ++){
      sumHour += union[i].hours;
    }
    return sumHour;
  }
}
