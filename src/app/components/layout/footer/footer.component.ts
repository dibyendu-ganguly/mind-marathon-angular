import { Component } from '@angular/core';
import { EXTERNAL_LINKS, RESOURCES } from '../../../constants/layout.constants';

@Component({
    selector: 'app-footer',
    imports: [],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
  externalLinks = EXTERNAL_LINKS
  resources = RESOURCES
  readonly thisYear = new Date().getFullYear();
}
