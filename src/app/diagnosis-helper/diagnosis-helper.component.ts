import { Component, OnInit } from '@angular/core';
import { DiagnosisService } from '../services/diagnosis/diagnosis.service';

import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { AppProgressSpinnerDialogComponent } from '../app-progress-spinner-dialog/app-progress-spinner-dialog.component';

@Component({
  selector: 'app-diagnosis-helper',
  templateUrl: './diagnosis-helper.component.html',
  styleUrls: ['./diagnosis-helper.component.scss']
})
export class DiagnosisHelperComponent implements OnInit {
  symptoms$;

  symptoms = [];
  selectedSymptoms = [];

  remainingSymptoms = [];

  symptom1 = "";

  symptom2 = "";

  symptom3 = "";

  diagnosisList = [];

  constructor(
    public diagnosisService: DiagnosisService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.diagnosisService)
    this.symptoms$ = this.diagnosisService.getSymptoms();
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
    this.selectedSymptoms = [this.symptom1, this.symptom2, this.symptom3]
    let reqBody = {
      "symptoms": this.selectedSymptoms
    }
    this.diagnosisService.getDiagnosis(reqBody).subscribe((res) => {
      console.log(res);
      this.diagnosisList = res['possibilities'];
      console.log(this.diagnosisList, res)
      dialogRef.close();
    }, err => {
      dialogRef.close();
    })
  }

}
