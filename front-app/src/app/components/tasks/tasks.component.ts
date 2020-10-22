import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {


  displayFinished=false;

  @Output() taskSelected: EventEmitter<any> = new EventEmitter()

  @Input() tasks = []

  @Input()  listId
 

  
  constructor(
    private taskService: TaskService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
  }


  tasksFinish(){
    return this.tasks.filter(x=>x.finish)
  }

  tasksNoFinish(){
    return this.tasks.filter(x=>!x.finish)
  }

  selectTask(task) {
    this.taskSelected.emit(task)
  }

  newTask() {
    this.dialogService.openForm('task',null, (task) => {
      if (task) {
        console.log(task)
        this.taskService.newTask(this.listId, task).subscribe(res => {
          console.log(res)
          this.tasks.push(res)
        })
      }
    })
  }


  updateTask(task) {
    this.taskService.updateTask(this.listId, task).subscribe(res => {
      console.log(res)
      task=res
    })
  }

  toggleFlag(task) {
    task.finish = !task.finish
    this.updateTask(task)
  }

}
