import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[scrollToFirsInvalidFormField]',
  exportAs : 'focusInvalidInput',
  standalone: true,
})
export class ScrollToFirstInvalidFormFieldDirective {
  private readonly elementRef = inject(ElementRef);

  @HostListener('ngSubmit')
  onSubmit(): void {
    this.scrollToFirstInvalidField();
  }

  private scrollToFirstInvalidField(): void {
    const invalidFields = this.elementRef.nativeElement.querySelectorAll('.mat-mdc-form-field.ng-invalid');
    const firstInvalidField = invalidFields[0];

    if (!firstInvalidField) {
      return;
    }

    firstInvalidField.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    firstInvalidField.classList.add('ng-dirty');
    const input = firstInvalidField.querySelector('input');
    const textarea = firstInvalidField.querySelector('textarea');

    if(input || textarea){
      setTimeout(() => {
        input?.focus();
        textarea?.focus();
      }, 500);
    }
  }
}
