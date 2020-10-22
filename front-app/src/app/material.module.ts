import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';




const materialModules =[
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
]


@NgModule({
  imports: [
    CommonModule,
    materialModules
  ],
  declarations: [],
  exports:[
    materialModules
  ]
})
export class MaterialModule { }
