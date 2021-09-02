import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface Notes {
  id: number,
  body: string,
  date: string,
  words: number
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  listNotes: Array<Notes>;
  itemNote: Notes;
  showCard: boolean = false;

  constructor(
    private noteService : NotesService,
    public dialog: MatDialog
  ) {
    this.listNotes = [];
    this.itemNote = {
      id: 0,
      body: "",
      date: "",
      words: 0
    };
   }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(async result => {
      await this.getAllNotes();
    });
  }
  
  async ngOnInit(): Promise<void> {
    await this.getAllNotes();
    
  }

  async getAllNotes(){
    var response = await this.noteService.getAllNotes();
    this.listNotes = response.data;
    this.showCard = false;
  }

  async noteSelected(e:any){
    var response = await this.noteService.findNote(parseInt(e));
    this.itemNote = response.data;
    this.showCard = true;
  }

  async closeNote(){
    this.showCard = false;
  }

  async deleteNote(){
    var response = await this.noteService.deleteNote(this.itemNote.id);
    if (response.status){
      await this.getAllNotes();
      this.showCard = false;
    }else{
      console.log("error")
    } 
  }

}

@Component({
  selector: 'dialog-create-note',
  templateUrl: 'dialog-create-note.html',
})
export class DialogContentExampleDialog implements OnInit {
  form: FormGroup;
  durationInSeconds = 5;
  constructor(
    private fb: FormBuilder,
    private noteService : NotesService,
    private notesComponent: NotesComponent,
    private _snackBar: MatSnackBar
  ){
    this.form = fb.group({
      title: fb.control('initial value', Validators.required)
  });
  }
  async ngOnInit(): Promise<void> {
    this.form = this.fb.group({
      texto: ['', Validators.required]
    });
  }
  async onSubmit() {
    console.log(this.form.get('texto'));
    if (this.form.valid) {
      const texto = this.form.get('texto')!.value;
      var response = await this.noteService.createNote(texto);
      if (response.status){
        this._snackBar.openFromComponent(PizzaPartyComponent, {
          duration: this.durationInSeconds * 1000,
        });
      }else{
        console.log("error")
      }
    }
  }
}
@Component({
  selector: 'snack-bar-note',
  templateUrl: 'snack-bar-note.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent {}
