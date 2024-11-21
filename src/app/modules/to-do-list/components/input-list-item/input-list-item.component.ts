import { Component, input } from '@angular/core';
import { IListItem } from '../interface/IListItem-interface';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {
  inputListItems = input.required<IListItem[]>();
}
