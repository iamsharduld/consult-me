import { Component, OnInit } from '@angular/core';
import { DiagnosisService } from '../services/diagnosis/diagnosis.service';

import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';

import { AppProgressSpinnerDialogComponent } from '../app-progress-spinner-dialog/app-progress-spinner-dialog.component';

@Component({
  selector: 'app-diagnosis-helper',
  templateUrl: './diagnosis-helper.component.html',
  styleUrls: ['./diagnosis-helper.component.scss']
})
export class DiagnosisHelperComponent implements OnInit {
  allSymptomList = [];
  diagnosisList = [];
  // symptomForm: FormGroup;
  selectedSymptoms = [];
  diagnosisRequested: boolean = false;
  noResultFound: boolean = false;
  // uiSymptomList = [];

  constructor(
    public diagnosisService: DiagnosisService,
    private dialog: MatDialog,
    private _fb: FormBuilder
  ) {}
  
  ngOnInit(): void {
    // this.symptomForm = this._fb.group({
    //   itemRows: this._fb.array([this.initItemRows()])
    // });

    let dialogRef: MatDialogRef<AppProgressSpinnerDialogComponent> = this.dialog.open(AppProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.diagnosisService.getSymptoms().subscribe((res) => {
      dialogRef.close();
      this.allSymptomList = res['items'];
    }, err => {
      dialogRef.close();
      console.log(err)
    })
  }

  getDiagnosis() {
    let dialogRef: MatDialogRef<AppProgressSpinnerDialogComponent> = this.dialog.open(AppProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });

    if(this.selectedSymptoms.length == 0){
      dialogRef.close();
      alert("Select at least one symptom");
      return;
    }

    let reqBody = {
      "symptoms": this.selectedSymptoms
    }
    this.diagnosisService.getDiagnosis(reqBody).subscribe((res) => {
      this.diagnosisRequested = true;
      if(res['possibilities'].length == 0) {
        dialogRef.close();
        this.noResultFound = true;
        this.diagnosisList = ["Too many symptoms selected. Please try a different combination or contact 'shrigis@yahoo.com' for further diagnosis"]
        return;
      }
      this.diagnosisList = res['possibilities'];
      dialogRef.close();
    }, err => {
      console.log(err);
      dialogRef.close();
    })
  }

  reset() {
    this.selectedSymptoms = [];
    this.diagnosisList = [];
    this.diagnosisRequested = false;
  }
}
