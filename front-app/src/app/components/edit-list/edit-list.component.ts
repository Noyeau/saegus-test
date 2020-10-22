import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  @Input() data
  @Output() formGroupChange: EventEmitter<any> = new EventEmitter()



  public form = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
  })
  constructor() {

    this.form.valueChanges.subscribe(() => {
      this.formGroupChange.emit(this.form)
    })
    if (this.data) {
      this.form.patchValue(this.data)
    }
  }

  ngOnInit() {

  }

}
