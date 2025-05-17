import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockPropertyComponent } from './unlock-property.component';

describe('UnlockPropertyComponent', () => {
  let component: UnlockPropertyComponent;
  let fixture: ComponentFixture<UnlockPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnlockPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnlockPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
