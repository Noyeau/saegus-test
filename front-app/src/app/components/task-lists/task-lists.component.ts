import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.scss']
})
export class TaskListsComponent implements OnInit {
@Input() taskLists=[]
@Output() listSelected:EventEmitter<any>= new EventEmitter()
  constructor() { }

  ngOnInit() {
    console.log(this.taskLists)
  }


  selectList(list){
    this.listSelected.emit(list)
  }

}
