import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewportLineService, ViewportLineData } from '../../services/viewport-line.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-viewport-line',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Lignes dynamiques du service -->
    <svg class="viewport-lines-container">
      <!-- Lignes avec points intermédiaires (deux segments) -->
      <line 
        *ngFor="let line of activeLinesWithIntermediate; trackBy: trackByLineId"
        [attr.x1]="line.startX"
        [attr.y1]="line.startY"
        [attr.x2]="line.intermediateX"
        [attr.y2]="line.intermediateY"
        [attr.stroke]="line.color || 'black'"
        stroke-width="5"
        [attr.data-component-id]="line.id + '-segment1'">
      </line>
      <line 
        *ngFor="let line of activeLinesWithIntermediate; trackBy: trackByLineId"
        [attr.x1]="line.intermediateX"
        [attr.y1]="line.intermediateY"
        [attr.x2]="line.endX"
        [attr.y2]="line.endY"
        [attr.stroke]="line.color || 'black'"
        stroke-width="5"
        [attr.data-component-id]="line.id + '-segment2'">
      </line>
      
      <!-- Lignes simples (sans points intermédiaires) -->
      <line 
        *ngFor="let line of activeLinesSimple; trackBy: trackByLineId"
        [attr.x1]="line.startX"
        [attr.y1]="line.startY"
        [attr.x2]="line.endX"
        [attr.y2]="line.endY"
        [attr.stroke]="line.color || 'black'"
        stroke-width="5"
        [attr.data-component-id]="line.id">
      </line>
    </svg>
  `,
  styles: [`
    .viewport-lines-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      pointer-events: none;
    }
    
    .viewport-lines-container line {
      transition: all 0.1s ease;
    }
  `]
})
export class ViewportLineComponent implements OnInit, OnDestroy {
  activeLines: ViewportLineData[] = [];
  activeLinesWithIntermediate: ViewportLineData[] = [];
  activeLinesSimple: ViewportLineData[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private viewportLineService: ViewportLineService) {}

  ngOnInit(): void {
    console.log('ViewportLineComponent ngOnInit');
    this.subscription.add(
      this.viewportLineService.lines$.subscribe(linesMap => {
        console.log('ViewportLineComponent - received linesMap:', linesMap);
        this.activeLines = Array.from(linesMap.values()).filter(line => line.isActive);
        
        // Séparer les lignes avec et sans points intermédiaires
        this.activeLinesWithIntermediate = this.activeLines.filter(line => 
          line.intermediateX !== undefined && line.intermediateY !== undefined
        );
        this.activeLinesSimple = this.activeLines.filter(line => 
          line.intermediateX === undefined || line.intermediateY === undefined
        );
        
        console.log('ViewportLineComponent - activeLines:', this.activeLines);
        console.log('ViewportLineComponent - activeLinesWithIntermediate:', this.activeLinesWithIntermediate);
        console.log('ViewportLineComponent - activeLinesSimple:', this.activeLinesSimple);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  trackByLineId(index: number, line: ViewportLineData): string {
    return line.id;
  }
}
