import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { DragDropModule } from '@angular/cdk/drag-drop'; //Drag and Drop


@Component({
  selector: 'app-personal-info',
  imports: [CommonModule,DragDropModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent {

}
