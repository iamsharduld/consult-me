import { Component, OnInit } from '@angular/core';
import { DiagnosisService } from '../services/diagnosis/diagnosis.service';

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
    public diagnosisService: DiagnosisService
  ) { }

  ngOnInit(): void {
    console.log(this.diagnosisService)
    this.symptoms$ = this.diagnosisService.getSymptoms();
    this.diagnosisService.getSymptoms().subscribe((res) => {
      this.symptoms = res['items'];
    })
  }

  getDiagnosis() {
    console.log(this.symptom1, this.symptom2, this.symptom3)
    this.selectedSymptoms = [this.symptom1, this.symptom2, this.symptom3]
    let reqBody = {
      "symptoms": this.selectedSymptoms
    }
    this.diagnosisService.getDiagnosis(reqBody).subscribe((res) => {
      console.log(res);
      this.diagnosisList = res['possibilities'];
      console.log(this.diagnosisList, res)
    })
  }

}
