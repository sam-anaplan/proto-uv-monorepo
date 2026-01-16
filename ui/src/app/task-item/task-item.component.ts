import { NgClass } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { TaskListItem } from '../model/task-item'
import { DeleteTodoButtonComponent } from '../delete-todo-button/delete-todo-button.component'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'li[type="task-item"]',
  imports: [DeleteTodoButtonComponent, NgClass, FormsModule],
  template: `
        <div
            class="my-4 w-full rounded-xl bg-emerald-100 p-2 hover:bg-emerald-200"
        >
            <input
                [id]="getUiTaskId()"
                type="checkbox"
                [(ngModel)]="taskInfo.done"
            />
            <label
                [for]="getUiTaskId()"
                class="ml-2 w-12"
                [ngClass]="{ 'line-through': taskInfo.done }"
                >{{ taskInfo.description }}</label
            >
            @if (taskInfo.done) {
                <delete-todo-button
                    class="align-top"
                    (deleteItem)="deleteTask()"
                    >X</delete-todo-button
                >
            }
        </div>
    `,
  styles: ``,
})
export class TaskListItemComponent {
  @Input() taskInfo!: TaskListItem
  @Input() index!: number
  @Output() change = new EventEmitter()
  @Output() delete = new EventEmitter()

  getUiTaskId() {
    return `task-item-${this.index}`
  }

  changeTaskInfo() {
    this.change.emit()
  }

  deleteTask() {
    this.delete.emit()
  }
}
