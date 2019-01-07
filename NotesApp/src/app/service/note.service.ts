import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Note {
  Note: String;
  CreatedBy: String;
  CreateOn: Date;
  Favorite: Boolean;
}

interface UpdateNote {
  Id: string;
  Note: String;
  CreatedBy: String;
  CreateOn: Date;
  Favorite: Boolean;
}

interface ReqConfig {
  url: string;
}

interface ReqNote {
  id: string;
  favorite: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    }),
  };
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  CreateNote(NewNote: Note): Observable<Note> {
    const ReqUrl: ReqConfig = {
          url: 'http://localhost:3000/create-note'
    };
    return this.http.post<Note>(ReqUrl.url, NewNote, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  UpdateNote(note: UpdateNote): Observable<UpdateNote> {
    const ReqUrl: ReqConfig = {
          url: 'http://localhost:3000/update-note'
    };
    return this.http.post<UpdateNote>(ReqUrl.url, note, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  GetAllNotes (param: ReqNote): Observable<ReqNote> {
    let NewParams: any =  new HttpParams();
    NewParams = param ;
    const url = 'http://localhost:3000/notes';
    if (NewParams) {
      return  this.http.get<ReqNote>(url, {params: NewParams}).pipe(
        catchError(this.handleError)
      );
    }
  }

  RemoveNote (param: ReqNote): Observable<ReqNote> {
    let NewParams: any =  new HttpParams();
    NewParams = param ;
    const url = 'http://localhost:3000/notes';
    if (NewParams) {
      return  this.http.get<ReqNote>(url, {params: NewParams}).pipe(
        catchError(this.handleError)
      );
    }
  }

  CrudOnNote (param: ReqNote): Observable<ReqNote> {
    let NewParams: any =  new HttpParams();
    NewParams = param ;
    const url = 'http://localhost:3000/notes';
    if (NewParams) {
      return  this.http.get<ReqNote>(url, {params: NewParams}).pipe(
        catchError(this.handleError)
      );
    }
  }
}
