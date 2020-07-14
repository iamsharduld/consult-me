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
  symptoms = [];
  diagnosisList = [];
  symptomForm: FormGroup;

  constructor(
    public diagnosisService: DiagnosisService,
    private dialog: MatDialog,
    private _fb: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.symptomForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()])
    });

    console.log(this.diagnosisService)
    let dialogRef: MatDialogRef<AppProgressSpinnerDialogComponent> = this.dialog.open(AppProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.diagnosisService.getSymptoms().subscribe((res) => {
      dialogRef.close();
      this.symptoms = res['items'];
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
    let selectedSymptoms = [];
    for(let i in this.symptomForm.value['itemRows']) {
      selectedSymptoms.push(this.symptomForm.value['itemRows'][i]['symptom']);
    }
    let reqBody = {
      "symptoms": selectedSymptoms
    }
    this.diagnosisService.getDiagnosis(reqBody).subscribe((res) => {
      if(res['possibilities'].length == 0) {
        dialogRef.close();
        this.diagnosisList = ["No results found"]
        return;
      }
      console.log(res);
      this.diagnosisList = res['possibilities'];
      console.log(this.diagnosisList, res)
      dialogRef.close();
    }, err => {
      dialogRef.close();
    })
  }

  get formArr() {
    return this.symptomForm.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this._fb.group({
      symptom: ['']
    });
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  addNewControl() {
    this.addNewRow();
  }

}
