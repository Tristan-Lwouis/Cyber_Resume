import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollingScriptComponent } from './rolling-script.component';

describe('RollingScriptComponent', () => {
  let component: RollingScriptComponent;
  let fixture: ComponentFixture<RollingScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollingScriptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollingScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
