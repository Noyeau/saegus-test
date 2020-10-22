import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task = null
  @Input() listId = null

  @Output() deleteTaskEmit: EventEmitter<boolean> = new EventEmitter()


  constructor(
    private dialogService: DialogService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }


  editTask() {
    this.dialogService.openForm('task', this.task, (task) => {
      if (task) {
        console.log(task)
        this.taskService.updateTask(this.listId, task).subscribe(res => {
          Object.assign(this.task, res)
        })
      }
    })
  }

  deleteTask() {

        this.taskService.deleteTask(this.listId, this.task.id).subscribe(res => {
          this.deleteTaskEmit.emit(true)
        })
   
  }


}
