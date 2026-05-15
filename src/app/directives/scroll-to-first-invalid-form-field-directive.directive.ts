import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Directive({
  selector: '[scrollToFirsInvalidFormField]',
  exportAs : 'focusInvalidInput',
  standalone: true,
})
export class ScrollToFirstInvalidFormFieldDirective {
  private readonly elementRef: ElementRef<any> = inject(ElementRef);
  private commonService = inject(CommonService);


  @HostListener('ngSubmit')
  onSubmit(): void {
    this.scrollToFirstInvalidField();
  }

  private scrollToFirstInvalidField(): void {

    const firstInvalidField = this.commonService.scrollToElementByQuery(this.elementRef, '.mat-mdc-form-field.ng-invalid');

    if (firstInvalidField) {
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
}
