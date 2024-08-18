import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdRecoveryComponent } from './pwd-recovery.component';

describe('PwdRecoveryComponent', () => {
  let component: PwdRecoveryComponent;
  let fixture: ComponentFixture<PwdRecoveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PwdRecoveryComponent]
    });
    fixture = TestBed.createComponent(PwdRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
