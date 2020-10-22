import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.scss']
})
export class TaskListsComponent implements OnInit {
  @Input() taskLists = []
  @Output() listSelected: EventEmitter<any> = new EventEmitter()
  constructor(
    private dialogService: DialogService,
    private taskService: TaskService

  ) { }

  ngOnInit() {
    console.log(this.taskLists)
  }


  selectList(list) {
    this.listSelected.emit(list)
  }



  newList() {
    this.dialogService.openForm('list', null, (list) => {
      if (list) {
        console.log(list)
        this.taskService.newList(list).subscribe(res => {
          this.taskLists.push(res)
          console.log(this.taskLists)
        })
      }
    })
  }


  delList(list) {
    this.dialogService.openInformation(
      'Confirmation',
      "Etes vous certain de vouloir supprimer la liste, toutes les Tâches associées seront égualement supprimés",
      (rep) => {
        if (rep) {
          console.log(list)
          this.taskService.deleteList(list.id).subscribe(res => {
            this.taskLists = this.taskLists.filter(x => x.id !== list.id)
            console.log(this.taskLists)
            this.listSelected.emit(null)
          })
        }
      })
  }

}
