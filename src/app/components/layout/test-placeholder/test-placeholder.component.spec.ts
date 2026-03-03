import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPlaceholderComponent } from './test-placeholder.component';

describe('TestPlaceholderComponent', () => {
  let component: TestPlaceholderComponent;
  let fixture: ComponentFixture<TestPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
