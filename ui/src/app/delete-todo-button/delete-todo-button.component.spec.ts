import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTodoButtonComponent } from './flat-button.component';

describe('FlatButtonComponent', () => {
  let component: DeleteTodoButtonComponent;
  let fixture: ComponentFixture<DeleteTodoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTodoButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteTodoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
