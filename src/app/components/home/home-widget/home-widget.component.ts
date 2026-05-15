import { Component, Input } from '@angular/core';
import { HomeWidget } from '../../../models/home-widget.model';

@Component({
  selector: 'app-home-widget',
  imports: [],
  templateUrl: './home-widget.component.html',
  styleUrl: './home-widget.component.scss'
})
export class HomeWidgetComponent {
  @Input() wid!: HomeWidget;
}
