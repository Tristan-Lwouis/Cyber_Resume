import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBulleComponent } from './info-bulle.component';

describe('InfoBulleComponent', () => {
  let component: InfoBulleComponent;
  let fixture: ComponentFixture<InfoBulleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBulleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoBulleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
