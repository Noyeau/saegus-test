import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  @Input() data
  @Output() formGroupChange: EventEmitter<any> = new EventEmitter()




  public form = new FormGroup({
    id: new FormControl(null),
    shortDescription: new FormControl(null, [Validators.required]),
    longDescription: new FormControl(null),
    echeanceDate: new FormControl(null, [Validators.required]),
    finish: new FormControl(false),
  })
  constructor() {

    this.form.valueChanges.subscribe(() => {
      console.log(this.form.value)
      this.formGroupChange.emit(this.form)
    })
  
  }

  ngOnInit() {
console.log(this.data)
if (this.data) {
  this.form.patchValue(this.data)
}
  }



}
