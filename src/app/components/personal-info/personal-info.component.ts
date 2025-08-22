import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { DragDropModule } from '@angular/cdk/drag-drop'; //Drag and Drop


@Component({
  selector: 'app-personal-info',
  imports: [CommonModule,DragDropModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent {
  @Input() tabTitle: string = 'EXPER1ENCE';
  @Input() content: string = `
    <h2>2025 → &lt;/now&gt; Formation LDNR :</h2>
    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>
    <br>
    <span>----------</span>

    <h2>2020 → 2025 Dessinateur en bureau d'étude :</h2>
    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>
    <br>
    <span>----------</span>

    <h2>2020 → 2025 Dessinateur en bureau d'étude :</h2>
    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>
    <br>
    <span>----------</span>
  `;
}
