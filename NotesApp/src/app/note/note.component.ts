import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup , FormControl, Validators} from '@angular/forms';

import { NoteService } from '../service/note.service';
import { NotesListComponent } from  '../notes-list/notes-list.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {

  NoteForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    note: new FormControl('', [Validators.required])
  });
  IsEdit: Boolean = false;
  NoteForEdit: any = {};

  @ViewChild(NotesListComponent)NoteListView: NotesListComponent;
  constructor(private noteService: NoteService) { }

  ngOnInit() {}
  createNote(noteValue) {
    console.log('note', noteValue);
     
    if (!this.IsEdit) {
      const NewNote = {
        Note: noteValue.note,
        CreatedBy: noteValue.name,
        CreateOn: new Date(),
        Favorite: false
      };
      this.noteService.CreateNote(NewNote).subscribe((res: any) => {
        console.log('create note res', res);
        if (res.status) {
          this.NoteForm.reset();
          this.RefreshList();
        }
      });
    } else {
      const UpdateNote = {
        Id: this.NoteForEdit._id,
        Note: noteValue.note,
        CreatedBy: noteValue.name,
        CreateOn: new Date(),
        Favorite: this.NoteForEdit.Favorite
      };

      this.noteService.UpdateNote(UpdateNote).subscribe((res: any) => {
        console.log('UpdateNote  res', res);
        if (res.status) {
          this.NoteForm.reset();
          this.RefreshList();
        }
      });
    }
  }

  RefreshList() {
    this.NoteListView.GetNotes();
  }

  EditNote(value) {
    console.log('Note value for edit', value);
    this.NoteForEdit = value;
    this.NoteForm.patchValue({
      name: value.CreatedBy,
      note: value.Note
    });
    this.IsEdit = true;
  }

}
