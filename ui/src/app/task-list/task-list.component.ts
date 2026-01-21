import { Component, inject, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { TaskListItemComponent } from '../task-item/task-item.component'
import { TaskListItem } from '../model/task-item'
import { TaskService } from '../task.service'
import { NumberService } from '../number.service'
import { CommonModule } from '@angular/common'
import { StandardButtonComponent } from '../standard-button/standard-button.component'

@Component({
  selector: 'app-task-list',
  imports: [
    TaskListItemComponent,
    StandardButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  template: `
        <div class="mb-4 rounded-lg bg-gray-900 p-4">
            <pre class="text-green-400 text-xs font-mono overflow-x-auto">
{{ figletText }}
{{ helloMessage }}
$ <span class="blinking-cursor">_</span>

            </pre>
        </div>
        <h2 class="text-xl font-semibold">Task List</h2>
        <div class="grid grid-cols-2">
            <div class="inline-block">
                <label
                    id="hide-completed-tasks"
                    class="text-sm mr-4 font-extralight italic"
                    >Hide completed tasks</label
                >
                <input
                    for="hide-completed-tasks"
                    type="checkbox"
                    [(ngModel)]="hideFinishedTasks"
                    (change)="updateVisibleTaskList()"
                />
            </div>
            <div class="inline-block text-right">
                <button type="submit" (click)="refreshTasks()">
                    🔄 refresh task list
                </button>
            </div>
        </div>
        @if (visibleTaskList) {
            <ul type="task-list">
                @for (taskItem of visibleTaskList; track taskItem.id) {
                    <li
                        type="task-item"
                        [taskInfo]="taskItem"
                        [index]="$index"
                        (change)="handleUpdateTask(taskItem)"
                        (delete)="handleDeleteTask(taskItem)"
                    ></li>
                }
            </ul>
        } @else {
            <p class="text-lg font-light italic">Loading...</p>
        }
        <hr class="mx-16 my-4 rounded-2xl border-2 border-emerald-900" />
        <form [formGroup]="contactForm" (ngSubmit)="handleAddTask()">
            <div class="w-full rounded-xl bg-emerald-200 p-2">
                <input
                    id="new-task-description"
                    formControlName="description"
                    [(ngModel)]="newTaskDescription"
                    class="w-1/2 rounded-md border-2 border-white bg-emerald-200 px-1 text-sm text-black hover:bg-emerald-100"
                />
                <button type="submit">
                    <label for="new-task-description">add task</label>
                </button>
            </div>
        </form>
        <div class="m-2 rounded-2xl bg-emerald-500 p-4 text-right text-white">
            <label class="text-lg font-light italic" for="generate-number-button"
                >My favorite number is {{ myNumber }}.</label
            >
            <button
                id="generate-number-button"
                (click)="generateNumber()"
                class="mx-4 bg-cyan-500 text-white text-sm font-semibold p-4 border-white border-2 rounded-2xl"
            >
                Generate a new one
            </button>
        </div>
    `,
  styles: `
    .blinking-cursor {
      animation: blink 1s steps(1) infinite;
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `,
})
export class TaskListComponent implements OnInit {
  private formBuilder = inject(FormBuilder)

  contactForm: FormGroup = this.formBuilder.group({
    description: ['', Validators.required],
  })

  submitted = false

  hideFinishedTasks = true
  newTaskDescription = ''

  myNumber = 42

  figletText = ''
  helloMessage = ''

  constructor(
    private taskService: TaskService,
    private numberService: NumberService)
  { }

  taskList?: TaskListItem[]
  visibleTaskList?: TaskListItem[] = []

  async ngOnInit() {
    this.refreshTasks()
    this.fetchHello()
  }

  async fetchHello() {
    try {
      const hello = await this.taskService.getHello()
      this.figletText = hello.figlet
      this.helloMessage = hello.message
    } catch (error) {
      console.error('Failed to fetch hello:', error)
    }
  }

  async refreshTasks() {
    this.taskList = await this.taskService.getTasks()
    this.updateVisibleTaskList()
  }

  async generateNumber() {
    this.myNumber = await this.numberService.getRandomNumber()
  }

  async handleAddTask() {
    this.newTaskDescription = this.newTaskDescription.trim()

    if (!this.contactForm.valid) {
      return
    }

    if (this.newTaskDescription) {
      console.log(
        `Adding task with description "${this.newTaskDescription}"`
      )
      await this.taskService.addTask({
        description: this.newTaskDescription,
      })
    }
    this.newTaskDescription = ''
    this.refreshTasks()
  }

  async handleDeleteTask(taskItem: TaskListItem) {
    const visibleIndex = this.visibleTaskList?.findIndex(
      (t) => t.id === taskItem.id
    )
    visibleIndex && this.visibleTaskList?.splice(visibleIndex, 1)

    const masterIndex = this.taskList?.findIndex(
      (t) => t.id === taskItem.id
    )
    masterIndex && this.taskList?.splice(masterIndex, 1)

    this.taskService.deleteTask(taskItem)
  }

  async handleUpdateTask(taskItem: TaskListItem) {
    if (this.taskList) {
      console.log(this.taskList?.map((t) => t.id))
      console.log(taskItem.id)

      const masterIndex = this.taskList?.findIndex(
        (t) => t.id === taskItem.id
      )
      console.log({ masterIndex })
      if (masterIndex != null) {
        this.taskList[masterIndex] = taskItem
        this.updateVisibleTaskList()
      }
    }
    await this.taskService.updateTask(taskItem)
  }

  updateVisibleTaskList() {
    console.log('update')
    this.visibleTaskList = []
    this.visibleTaskList = this.taskList?.filter(
      (t) => !this.hideFinishedTasks || !t.done
    )
    console.log({ taskList: this.taskList })
    console.log({ visibleTaskList: this.visibleTaskList })
  }
}
