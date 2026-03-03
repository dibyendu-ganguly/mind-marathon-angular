import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrastChangeComponent } from './contrast-change.component';

describe('ContrastChangeComponent', () => {
  let component: ContrastChangeComponent;
  let fixture: ComponentFixture<ContrastChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContrastChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContrastChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
