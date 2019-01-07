import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NoteService } from '../service/note.service';
import { Observable } from 'rxjs';

interface NoteBody {
  CreateOn: Date;
  CreatedBy: String;
  Favorite: Boolean;
  Note: String;
  __v: Number;
  _id: String;
}

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  AllNotes: Observable<NoteBody[]>;
  FavNotes: Observable<NoteBody[]> ;
  NoteKey: string[] = ['CreatedBy', 'Note', 'CreateOn', 'Favorite'];
  selectedTab: Number = 0;

  @Output()EditEvent: EventEmitter<any> = new EventEmitter();

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.GetNotes();
  }

  GetNotes() {
    const ReqParams = {
      id: '',
      favorite: false
    };
    this.noteService.GetAllNotes(ReqParams).subscribe((res: any) => {
      console.log('Get all notes', res);
      this.AllNotes = res.data;
      const FavNote: any = [];
      res.data.filter((note: NoteBody) => {
        if (note.Favorite == true) {
          FavNote.push(note);
        }
      });
      this.FavNotes = FavNote;
      console.log('FavNotes', this.FavNotes);
      // this.NoteKey = Object.keys(this.Notes[0]);
      // console.log('NoteKey', this.NoteKey);
    });
  }

  Favorite(noteRow) {
    console.log('note', noteRow);
    const FavReqParams = {
      id: noteRow._id,
      favorite: true
    };
    this.noteService.CrudOnNote(FavReqParams).subscribe((res: any) => {
      console.log('Favorite res', res);

      if (res.status) {
        this.selectedTab = 1;
        this.GetNotes();
      }
    });
  }

  UnFavorite(noteRow) {
    console.log('noteRow', noteRow);
    const UnFavReqParams = {
      id: noteRow._id,
      favorite: false
    };
    this.noteService.CrudOnNote(UnFavReqParams).subscribe((res: any) => {
      console.log('UnFavorite res', res);

      if (res.status) {
        this.selectedTab = 0;
        this.GetNotes();
      }
    });
  }

  EditNote (editNote) {
    this.EditEvent.emit(editNote);
  }

  DeleteNote (note) {
    const removeNote = {
      id: note._id,
      favorite: false
    };
    this.noteService.CrudOnNote(removeNote).subscribe((res: any) => {
      console.log('removeNote res', res);

      if (res.status) {
        this.GetNotes();
      }
    });
  }
}
