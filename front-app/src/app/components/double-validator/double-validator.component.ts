import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-double-validator',
  templateUrl: './double-validator.component.html',
  styleUrls: ['./double-validator.component.scss']
})
export class DoubleValidatorComponent implements OnInit {

  @Input() type = 'text';
  @Output() validValue: EventEmitter<string> = new EventEmitter();

@Input() label="";

  input1: string;
  input2: string;

  constructor() { }

  ngOnInit() {
  }

  valueChange() {
    if (this.isValid()) {
      this.validValue.emit(this.input1);
      return
    }
    this.validValue.emit(null);
  }

  isValid() {
    return (this.input1 && this.input1 == this.input2);
  }

}
