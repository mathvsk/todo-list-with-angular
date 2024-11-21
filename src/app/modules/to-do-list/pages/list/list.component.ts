import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from "../../components/input-add-item/input-add-item.component";
import { IListItem } from '../../components/interface/IListItem-interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);

  showTaskInput() {
    this.addItem.set(false);
  }

  #setListItems = signal<IListItem[]>([this.#parseItems()]);
  public getListItems = this.#setListItems.asReadonly();

  #parseItems() {
    return JSON.parse(localStorage.getItem('@angular-todo-list') || '[]');
  }

  addItemListItem(value: IListItem) {
    localStorage.setItem('@angular-todo-list', JSON.stringify(value));
  }
}
