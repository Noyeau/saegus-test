import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiBackUrl

constructor(
  private http: HttpClient
) {}


getLists(): Observable<any[]>{
  return this.http.get(this.apiUrl+"/lists") as Observable<any[]>
}

getList(listId:number): Observable<any>{
  return this.http.get(this.apiUrl+"/lists/"+listId)
}

newList(list:any): Observable<any>{
  return this.http.post(this.apiUrl+"/lists",list)
}

updateList(list:any): Observable<any>{
  return this.http.post(this.apiUrl+"/lists/"+list.id,list)
}

deleteList(listId:number): Observable<any>{
  return this.http.delete(this.apiUrl+"/lists/"+listId)
}





getTasks(listId): Observable<any[]>{
  return this.http.get(this.apiUrl+`/lists/${listId}/tasks`) as Observable<any[]>
}

getTask(listId:number,taskId:number): Observable<any>{
  return this.http.get(this.apiUrl+`/lists/${listId}/tasks/${taskId}`)
}

newTask(listId:number,task:any): Observable<any>{
  return this.http.post(this.apiUrl+`/lists/${listId}/tasks`,task)
}

updateTask(listId:number,task:any): Observable<any>{
  return this.http.post(this.apiUrl+`/lists/${listId}/tasks/${task.id}`,task)
}

deleteTask(listId:number,taskId:number): Observable<any>{
  return this.http.delete(this.apiUrl+`/lists/${listId}/tasks/${taskId}`)
}

}
