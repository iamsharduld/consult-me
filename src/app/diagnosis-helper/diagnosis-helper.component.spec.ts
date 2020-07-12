import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisHelperComponent } from './diagnosis-helper.component';

describe('DiagnosisHelperComponent', () => {
  let component: DiagnosisHelperComponent;
  let fixture: ComponentFixture<DiagnosisHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosisHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
