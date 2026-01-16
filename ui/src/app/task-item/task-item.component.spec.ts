import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListItemComponent } from './task-item.component';

describe('TaskListItemComponent', () => {
  let component: TaskListItemComponent;
  let fixture: ComponentFixture<TaskListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the task name', () => {
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('<span>')).toBeTruthy()
    expect(compiled.querySelector('<span>')?.textContent).toBe()
  })
});
