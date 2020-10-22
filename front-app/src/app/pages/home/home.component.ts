import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title = 'Saegus Taches Test';
  public leftMenuOpen=true;


  public taskLists=[]
  public selectedList=null
  public selectedTask=null


  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskService.getLists().subscribe(res=>{
      this.taskLists=res
    })
  }

  toogleSideBar(ref:string){
    if(ref == 'left'){
      this.leftMenuOpen= ! this.leftMenuOpen
    }
  }


  selectList(list){
    this.selectedList=list
    this.selectedTask=null
  }

  selectTask(task){
    console.log(task)
    this.selectedTask=task
  }

}
