import { Component, inject, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/service/project.service';
import { TranslatePipe } from '@ngx-translate/core';
import { UnionService } from '../../shared/service/union.service';
import { UserService } from '../../shared/service/user.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})

export class Dashboard {
  protected readonly projectSvc = inject(ProjectService);
  protected readonly unionsSvc = inject(UnionService);
  protected readonly UserSvc = inject(UserService);
}
