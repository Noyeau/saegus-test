import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InformationDialogComponent } from '../dialogs/information-dialog/information-dialog.component';
import { FormDialogComponent } from '../dialogs/form-dialog/form-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

constructor(
  public dialog: MatDialog
) { }



openInformation(title=null, text=null, callback=null){
  const dialogRef = this.dialog.open(InformationDialogComponent, {
    width: '250px',
    data: {title, text}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    if(callback){
      callback(result)
    }
  });
}


openForm(type="list", data=null, callback=null){
  const dialogRef = this.dialog.open(FormDialogComponent, {
    width: '250px',
    data: {type, data, title:"Créer une Liste"}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    if(callback){
      callback(result)
    }
  });
}
}
