import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../services/layout.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
    selector: 'app-theme-toggle',
    imports: [CommonModule, FormsModule, MatTooltipModule, MatButtonToggleModule],
    templateUrl: './theme-toggle.component.html',
    styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {

    themeService = inject(ThemeService);

    colorScheme = this.themeService.colorScheme;
    changeTheme(){
      this.themeService.colorScheme.update(currenttheme => currenttheme=='dark'?'light':'dark');
    }
}
