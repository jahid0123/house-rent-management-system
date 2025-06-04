import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LauncherDashboardComponent } from './launcher-dashboard.component';

describe('LauncherDashboardComponent', () => {
  let component: LauncherDashboardComponent;
  let fixture: ComponentFixture<LauncherDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LauncherDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LauncherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
