import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop'; //Drag and Drop

@Component({
  selector: 'app-competances',
  imports: [CommonModule,DragDropModule],
  templateUrl: './competances.component.html',
  styleUrl: './competances.component.scss'
})
export class CompetancesComponent {

}
