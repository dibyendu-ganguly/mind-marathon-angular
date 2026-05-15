import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedEventListComponent } from './created-event-list.component';

describe('CreatedEventListComponent', () => {
  let component: CreatedEventListComponent;
  let fixture: ComponentFixture<CreatedEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatedEventListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
