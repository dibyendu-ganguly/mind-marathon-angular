import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Component, inject, input } from '@angular/core';
import { CONTRAST_OPTIONS, ContrastOption, ThemeService } from '../../../services/layout.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ContrastChangeComponent } from '../contrast-change/contrast-change.component';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { RouterModule } from '@angular/router';
import { ToggleAnimation } from './toggle.animation';
import { UserDropdownMenuComponent } from '../user-dropdown-menu/user-dropdown-menu.component';

export type ProgressMode = 'determinate'|'indeterminate';

@Component({
    selector: 'app-navigation-header',
    imports: [
        CommonModule, FormsModule, MatTooltipModule, MatButtonToggleModule, ThemeToggleComponent, ContrastChangeComponent, LanguageSelectorComponent, RouterModule, MatProgressBarModule,
        UserDropdownMenuComponent
    ],
    templateUrl: './navigation-header.component.html',
    styleUrl: './navigation-header.component.scss',
    animations: [ToggleAnimation]
})
export class NavigationHeaderComponent {
  mode = input.required<ProgressMode>();

  private themeService = inject(ThemeService);
  googleTranslatorHidden = this.themeService.googleTranslatorHidden;
}
