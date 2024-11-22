import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IListItem } from '../../interface/IListItem-interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  @Output() public outputAddItemListItem = new EventEmitter<IListItem>();
  @ViewChild(("inputText")) public inputText!: ElementRef;
  @Input({ required: true }) public inputListItems: IListItem[] = [];

  focusAndAdditem(value: string) {    
    this.outputAddItemListItem.emit({
      id: `ID ${new Date().getTime()}`,
      checked: false,
      value
    });

    this.inputText.nativeElement.value = "";
    this.inputText.nativeElement.focus();
  }
}
