import { Injectable } from '@angular/core'
import { TaskListItem } from './model/task-item'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { TaskItemDto } from './dto/task-item'

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) { }

  private url(path: string) {
    return `http://localhost:8080/${path}`
  }

  async getTasks() {
    return await firstValueFrom(
      this.httpClient.get<TaskListItem[]>(this.url('tasks'))
    )
  }

  async updateTask(taskInfo: TaskItemDto) {
    if (!taskInfo.id) {
      throw new Error('update task called with no task id')
    }

    console.log(`calling api to update task with id "${taskInfo.id}"`)
    return await firstValueFrom(
      this.httpClient.put<TaskListItem>(this.url('task'), taskInfo)
    )
  }

  async deleteTask(taskInfo: TaskItemDto) {
    if (!taskInfo.id) {
      throw new Error('delete task called with no task id')
    }

    console.log(`calling api to delete task with id "${taskInfo.id}"`)
    return await firstValueFrom(
      this.httpClient.delete(this.url(`task/${taskInfo.id}`))
    )
  }

  async addTask(taskInfo: TaskItemDto) {
    if (!taskInfo.description) {
      throw new Error('delete task called with no task description')
    }

    console.log(
      `calling api to add task: with description "${taskInfo.description}"`
    )
    return await firstValueFrom(
      this.httpClient.post<TaskListItem>(this.url('task'), taskInfo)
    )
  }
}
