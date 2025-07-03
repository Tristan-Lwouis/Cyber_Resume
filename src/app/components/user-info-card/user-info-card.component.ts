
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-info-card',
  standalone: true, // ?? A quoi ca sert ?
  imports: [],
  templateUrl: './user-info-card.component.html',
  styleUrl: './user-info-card.component.scss'
})
export class UserInfoCardComponent {
    @Input() title: string = '';
    @Input() titleClass: string = '';
}
