import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProcessesComponent } from './manage-processes.component';

describe('ManageProcessesComponent', () => {
  let component: ManageProcessesComponent;
  let fixture: ComponentFixture<ManageProcessesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageProcessesComponent]
    });
    fixture = TestBed.createComponent(ManageProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
