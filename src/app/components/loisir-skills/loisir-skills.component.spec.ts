import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoisirSkillsComponent } from './loisir-skills.component';

describe('LoisirSkillsComponent', () => {
  let component: LoisirSkillsComponent;
  let fixture: ComponentFixture<LoisirSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoisirSkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoisirSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
