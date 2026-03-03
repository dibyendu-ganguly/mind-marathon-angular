import { CommonModule, NgSwitch, NgSwitchCase, TitleCasePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CONTRAST_OPTIONS, ContrastOption, ThemeService } from '../../../services/layout.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-contrast-change',
  standalone: true,
  imports: [TitleCasePipe, MatIconModule, MatButtonToggleModule, FormsModule, MatTooltipModule, MatMenuModule],
  templateUrl: './contrast-change.component.html',
  styleUrl: './contrast-change.component.scss'
})
export class ContrastChangeComponent {

  @Input() mode: 'icon' | 'text' = 'icon';

  themeService = inject(ThemeService);



  contrastOptions = CONTRAST_OPTIONS;
  contrast = this.themeService.contrast;

  changeContrast(contrast: ContrastOption) {
    this.themeService.contrast.set(contrast);
  }
}
