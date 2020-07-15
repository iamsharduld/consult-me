import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  constructor(
    private http: HttpClient
  ) { }

  addHero () {
    // return this.http.post(this.heroesUrl, hero, httpOptions);
  }

  getSymptoms() {
    return this.http.get("http://127.0.0.1:5000/symptoms");
  }

  getDiagnosis(symptomList) {
    console.log(symptomList)
    return this.http.post("https://morning-caverns-92659.herokuapp.com/diagnose", symptomList);
  }
}
