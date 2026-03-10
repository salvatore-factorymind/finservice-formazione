import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/service/project.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports:[TranslatePipe]
})
export class Dashboard {
  protected readonly projectSvc = inject(ProjectService);
}
