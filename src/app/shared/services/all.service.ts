import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, Subject, throwError } from 'rxjs';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import emailjs from '@emailjs/browser';
import { firebaseConfig } from '../../firebase.config';
import { DialogComponent } from '../components/dialog/dialog.component';
// import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AllService {
  private storage = getStorage();
  constructor(private http: HttpClient, private router: Router
    // , public dialog: MatDialog
  ) { }
  postSubject: Subject<any> = new Subject();
  addNews(data: any) {


    this.http
      .post<any>(firebaseConfig.databaseURL + '/news.json', data)
      .subscribe((responseData) => {
        console.log(responseData);
        // let name = <{ name: string }><unknown>responseData;
        // this.postSubject.next({ id: name.name, post: p });
        // this.router.navigate(['/tabs/posts']);
        //   this.std.id=responseData.toString();
        //this.std = new StudentModule('', '', '', '', '', '');
      });
  }
  /**
       * Opens a dialog with the specified data message using the DialogModuleComponent.
       *
       * @param {any} dataMsg - The data message to be displayed in the dialog.
       * @returns {Observable<any>} An Observable that resolves when the dialog is closed.
       */
  // showDialog(dataMsg: any): Observable<any> {
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     width: '80rem',
  //     maxHeight: '90vh',
  //     data: dataMsg,
  //     panelClass: 'my-dialog-container-class',
  //   });
  //   return dialogRef.afterClosed();
  // }
  addUser(data: any) {


    this.http
      .post<any>(firebaseConfig.databaseURL + '/users.json', data)
      .subscribe((responseData) => {
        console.log(responseData);

      });
  }
  fetchUsers(): Observable<any[]> {
    return this.http
      .get<any[]>(`${firebaseConfig.databaseURL}` + '/users.json')
      .pipe(
        catchError((err) => {
          return throwError(err.message || 'Server Issue');
        })
      );
  }
  fetchPosts(): Observable<any[]> {
    return this.http
      .get<any[]>(`${firebaseConfig.databaseURL}` + '/news.json')
      .pipe(
        catchError((err) => {
          return throwError(err.message || 'Server Issue');
        })
      );
  }
  uploadFile(file: File): Promise<string> {
    const filePath = `uploads/${Date.now()}_${file.name}`; // Unique file path
    const fileRef = ref(this.storage, filePath);

    return uploadBytes(fileRef, file)
      .then(() => getDownloadURL(fileRef));
  }
  sendEmail(data: any) {
    return emailjs.send(
      'service_yfi30ql',
      'template_5rlw4w4',
      data,
      'a-wB3BQtqw17pJKrs'
    );
  }
}


