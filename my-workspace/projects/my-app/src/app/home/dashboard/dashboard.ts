import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/service/project.service';
import { TranslatePipe } from '@ngx-translate/core';
import { UnionService } from '../../shared/service/union.service';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [TranslatePipe],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})

export class Dashboard {
  protected readonly projectSvc = inject(ProjectService);
  protected readonly unionsSvc = inject(UnionService);
  protected readonly UserSvc = inject(UserService);
  
  protected totalHour(): number{
    let sumHour = 0;
    const union = this.unionsSvc.Union();
    for(let i = 0; i < union.length; i ++){
      sumHour += union[i].hours;
    }
    return sumHour;
  }
}
