import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoComponent } from './deco.component';

describe('DecoComponent', () => {
  let component: DecoComponent;
  let fixture: ComponentFixture<DecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
