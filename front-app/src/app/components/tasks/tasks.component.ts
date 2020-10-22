import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

@Output() taskSelected:EventEmitter<any>= new EventEmitter()



  private _listId
  @Input() set listId(value) {
    this._listId = value
    if(value){
      this.getTasks(value)
    }
  }

  get listId() {
    return this._listId
  }


  public tasks=[]
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }


  getTasks(id){
    this.taskService.getTasks(id).subscribe(res=>{
      console.log(res)
      this.tasks=res
    })
  }

  selectTask(task){
    this.taskSelected.emit(task)
  }

}
