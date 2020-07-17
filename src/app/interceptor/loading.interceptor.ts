import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AppProgressSpinnerDialogComponent } from '../app-progress-spinner-dialog/app-progress-spinner-dialog.component';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private dialog: MatDialog) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let dialogRef: MatDialogRef<AppProgressSpinnerDialogComponent> = this.dialog.open(AppProgressSpinnerDialogComponent, {
        panelClass: 'transparent',
        disableClose: true
    });
    this.totalRequests++;
    console.log('here', request);

    return next.handle(request).pipe(
      finalize(
        () => {
            this.totalRequests--;
            if (this.totalRequests === 0) {
                dialogRef.close()
            }
        })
    );
  }
}