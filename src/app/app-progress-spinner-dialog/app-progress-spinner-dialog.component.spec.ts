import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProgressSpinnerDialogComponent } from './app-progress-spinner-dialog.component';

describe('AppProgressSpinnerDialogComponent', () => {
  let component: AppProgressSpinnerDialogComponent;
  let fixture: ComponentFixture<AppProgressSpinnerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppProgressSpinnerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProgressSpinnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
