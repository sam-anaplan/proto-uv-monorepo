import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'delete-todo-button',
  standalone: true,
  imports: [],
  template: `
  <button (click)="handleButtonClick()" class="mx-4 rounded-sm px-1 bg-emerald-300 hover:bg-emerald-500 active:bg-emerald-500 text-xs">
    <ng-content>
    </ng-content>
  </button> `,

})
export class DeleteTodoButtonComponent {
  @Output() deleteItem = new EventEmitter()
  handleButtonClick() {
    this.deleteItem.emit()
  }
}
