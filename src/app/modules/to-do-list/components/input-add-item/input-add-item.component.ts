import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { IListItem } from '../interface/IListItem-interface';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  @Output() public outputItemList = new EventEmitter<IListItem>();
  @ViewChild(("inputText")) public inputText!: ElementRef;

  focusAndAdditem(value: string) {    
    this.outputItemList.emit({
      id: `ID ${new Date().getTime()}`,
      checked: false,
      value
    });

    this.inputText.nativeElement.value = "";
    this.inputText.nativeElement.focus();
  }
}
