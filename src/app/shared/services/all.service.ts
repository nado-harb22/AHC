import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, Subject, throwError } from 'rxjs';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
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
  addCategory(data: any) {


    this.http
      .post<any>(firebaseConfig.databaseURL + '/categories.json', data)
      .subscribe((responseData) => {
        console.log(responseData);

      });
  }
  addCategoryImg(data: any) {


    this.http
      .post<any>(firebaseConfig.databaseURL + '/categories_images.json', data)
      .subscribe((responseData) => {
        console.log(responseData);

      });
  }
  getImagesByCategoryId(categorieId: string):Observable<any> {
    return this.http
      .get<any[]>(`${firebaseConfig.databaseURL}` + '/categories_images.json')
      .pipe(
        catchError((err) => {
          return throwError(err.message || 'Server Issue');
        })
      );
  }
  getImagesFromFolder(folderName: string) {
    const storage = getStorage();
    const folderRef = ref(storage, folderName);

    return listAll(folderRef)
      .then(async (res) => {
        const urls: string[] = [];
        for (const itemRef of res.items) {
          const url = await getDownloadURL(itemRef);
          urls.push(url);
        }
        return urls;
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        return [];
      });
  }

  addNewsAr(data: any) {


    this.http
      .post<any>(firebaseConfig.databaseURL + '/news_ar.json', data)
      .subscribe((responseData) => {
        console.log(responseData);

      });
  }
  /**
       * Opens a dialog with the specified data message using the DialogModuleComponent.
       *
       * @param {any} dataMsg - The data message to be displayed in the dialog.
       * @returns {Observable<any>} An Observable that resolves when the dialog is closed.
       */
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
  fetchCategories(): Observable<any[]> {
    return this.http
      .get<any[]>(`${firebaseConfig.databaseURL}` + '/categories.json')
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
  fetchPostsAr(): Observable<any[]> {
    return this.http
      .get<any[]>(`${firebaseConfig.databaseURL}` + '/news_ar.json')
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
  uploadFileOfCategory(categoriesId: string, file: File): Promise<string> {
    const filePath = `${categoriesId}/${Date.now()}_${file.name}`; // Unique file path
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


