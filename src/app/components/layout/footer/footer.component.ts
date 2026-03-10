import { Component } from '@angular/core';
import { ExternalLinks } from '../../../constants/layout.constants';

@Component({
    selector: 'app-footer',
    imports: [],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
  externalLinks = ExternalLinks
}
