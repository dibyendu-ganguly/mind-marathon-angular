import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/layout.service';
import { ContrastChangeComponent } from '../contrast-change/contrast-change.component';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { UserDropdownMenuComponent } from '../user-dropdown-menu/user-dropdown-menu.component';
import { ToggleAnimation } from './toggle.animation';

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

  x = "\u003Cp\u003EThe \u003Cb\u003E2025 World Figure Skating Championships\u003C/b\u003E were held from March 26 to 30 at the TD Garden in Boston, Massachusetts, in the United States. Sanctioned by the International Skating Union (ISU), the World Championships are considered the most prestigious event in figure skating. Medals were awarded in men's singles, women's singles, pair skating, and ice dance. The competition determined the entry quotas for each skating federation to the 2026 Winter Olympics. Ilia Malinin and Alysa Liu, both of the United States, won the men's and women's events, respectively. Riku Miura and Ryuichi Kihara of Japan won the pairs event, and Madison Chock and Evan Bates of the United States won the ice dance event.\u003C/p\u003E"
  navigationItems = [
    { label: 'Home', link: '/' },
    { label: 'Quiz', link: '/quiz' },
    { label: 'Events', link: '/events' },
    { label: 'Services', link: '/services' },
    { label: 'Contact', link: '/contact' }
  ];

  authService = inject(AuthService);
  isAuthenticated = this.authService.isAuthenticated;
}
