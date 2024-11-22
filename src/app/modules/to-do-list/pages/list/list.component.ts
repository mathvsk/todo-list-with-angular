import { Component, signal } from '@angular/core';

import { InputAddItemComponent } from "../../components/input-add-item/input-add-item.component";
import { InputListItemComponent } from "../../components/input-list-item/input-list-item.component";

import { IListItem } from '../../interface/IListItem-interface';

import { ELocalStorage } from '../../enum/ELocalStorage.enum';
import Swal from 'sweetalert2';
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

  #updateLocalStorage() {
    localStorage.setItem(ELocalStorage.AngularToDoList, JSON.stringify(this.#setListItems()));
  }

  #parseItems() {
    return JSON.parse(localStorage.getItem(ELocalStorage.AngularToDoList) || '[]');
  }

  addItemListItem(value: IListItem) {
    localStorage.setItem(
      ELocalStorage.AngularToDoList, 
      JSON.stringify([...this.#setListItems(), value])
    );

    return this.#setListItems.set(this.#parseItems());
  }

  deleteAllItems() {
    Swal.fire({
      title: "Você tem certeza que deseja deletar todos os itens?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!"
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }
      
      localStorage.removeItem(ELocalStorage.AngularToDoList);
      return this.#setListItems.set(this.#parseItems());
    })
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

    this.#updateLocalStorage();
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

    this.#updateLocalStorage();
  }

  deleteItem(itemId: string) {
    this.#setListItems.update((oldValue) => {
      return oldValue.filter((oldItem) => oldItem.id !== itemId);
    });

    this.#updateLocalStorage();
  }
}
