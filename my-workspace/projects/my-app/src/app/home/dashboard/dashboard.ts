import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [TranslatePipe]
})
export class Dashboard{
  protected readonly UserSvc = inject(UserService);
}
