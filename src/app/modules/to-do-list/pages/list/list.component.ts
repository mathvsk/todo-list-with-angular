import { Component, signal } from '@angular/core';

import { InputAddItemComponent } from "../../components/input-add-item/input-add-item.component";
import { InputListItemComponent } from "../../components/input-list-item/input-list-item.component";

import { IListItem } from '../../interface/IListItem-interface';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);

  showTaskInput() {
    this.addItem.set(false);
  }

  #setListItems = signal<IListItem[]>(this.#parseItems());
  public getListItems = this.#setListItems.asReadonly();

  #parseItems() {
    return JSON.parse(localStorage.getItem('@angular-todo-list') || '[]');
  }

  addItemListItem(value: IListItem) {
    localStorage.setItem(
      '@angular-todo-list', 
      JSON.stringify([...this.#setListItems(), value])
    );

    return this.#setListItems.set(this.#parseItems());
  }

  deleteAllItems() {
    localStorage.removeItem('@angular-todo-list');
    return this.#setListItems.set(this.#parseItems());
  }

  listItemsStage(value: 'pending' | 'completed'): IListItem[] {
    return this.getListItems().filter((item) =>  {
      if (value === 'pending') {
        return !item.checked;
      } else {
        return item.checked;
      }
    });
  }

  updateItemCheckbox(item: { id: string; checked: boolean; }) {
    this.#setListItems.update((oldValue) => {
      oldValue.filter((oldItem) => {
        if (oldItem.id === item.id) {
          oldItem.checked = item.checked;
        }

        return oldItem;
      });

      return oldValue;
    })

    return localStorage.setItem('@angular-todo-list', JSON.stringify(this.#setListItems()));
  }

  updateItemText(item: { id: string; value: string; }) {
    this.#setListItems.update((oldValue) => {
      oldValue.filter((oldItem) => {
        if (oldItem.id === item.id) {
          oldItem.value = item.value;
        }

        return oldItem;
      });

      return oldValue;
    })

    return localStorage.setItem('@angular-todo-list', JSON.stringify(this.#setListItems()));
  }

  deleteItem(itemId: string) {
    this.#setListItems.update((oldValue) => {
      return oldValue.filter((oldItem) => oldItem.id !== itemId);
    });

    return localStorage.setItem('@angular-todo-list', JSON.stringify(this.#setListItems()));
  }
}
