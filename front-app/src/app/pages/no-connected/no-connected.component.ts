import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-no-connected',
  templateUrl: './no-connected.component.html',
  styleUrls: ['./no-connected.component.scss']
})
export class NoConnectedComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) {
    console.log()
    this.route.params.subscribe(res=>{

    })
  }

  ngOnInit() {
  }

}
