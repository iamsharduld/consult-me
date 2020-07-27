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

    this.diagnosisService.getSymptoms().subscribe((res) => {
      this.allSymptomList = res['items'];
    }, err => {
      console.log(err)
    })
  }

  getDiagnosis() {

    if(this.selectedSymptoms.length == 0){
      alert("Select at least one symptom");
      return;
    }

    let reqBody = {
      "symptoms": this.selectedSymptoms
    }
    this.diagnosisService.getDiagnosis(reqBody).subscribe((res) => {
      this.diagnosisRequested = true;
      if(res['possibilities'].length == 0) {
        this.noResultFound = true;
        this.diagnosisList = ["Too many symptoms selected. Please try a different combination or contact 'surgerypune@gmail.com' for further diagnosis"]
        return;
      }
      this.diagnosisList = res['possibilities'];
    }, err => {
      console.log(err);
    })
  }

  reset() {
    this.selectedSymptoms = [];
    this.diagnosisList = [];
    this.diagnosisRequested = false;
  }
}
