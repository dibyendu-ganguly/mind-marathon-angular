import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuizImportComponent } from './create-quiz-import.component';

describe('CreateQuizImportComponent', () => {
  let component: CreateQuizImportComponent;
  let fixture: ComponentFixture<CreateQuizImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQuizImportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQuizImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
