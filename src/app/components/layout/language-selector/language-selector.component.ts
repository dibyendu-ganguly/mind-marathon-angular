import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../../services/layout.service';
export interface AppLang{
  code: string;
  name: string;
}

const MOCK_APP_LANG : AppLang[] = [
  {
    code: 'En',
    name: 'English'
  },
  {
    code: 'Fr',
    name: 'French'
  },
  {
    code: 'De',
    name: 'German'
  }
];
@Component({
    selector: 'app-language-selector',
    imports: [MatTooltipModule, MatMenuModule],
    templateUrl: './language-selector.component.html',
    styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  availableLanguages : AppLang[] = MOCK_APP_LANG;

  hidden = true;
  private themeService = inject(ThemeService);
  googleTranslatorHidden = this.themeService.googleTranslatorHidden;
}
