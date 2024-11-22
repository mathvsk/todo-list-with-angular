import { Component, EventEmitter, input, output } from '@angular/core';
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
  outputUpdateItemCheckbox = output<{ id: string, checked: boolean }>();
  outputUpdateItemText = output<{ id: string, value: string }>();
  outputDeleteItem = output<string>();

  public updateItemCheckbox(id: string, checked: boolean) {
    this.outputUpdateItemCheckbox.emit({ id, checked });
  }

  public updateItemText(id: string, value: string) {
    this.outputUpdateItemText.emit({ id, value });
  }

  public deleteItem(id: string) {
    this.outputDeleteItem.emit(id);
  }
}
