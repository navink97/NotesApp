import { Component, OnInit } from '@angular/core';
import{ NotesService} from '../../shared/notes.service'
import{ Note} from '../../shared/note-model'
import{ itemAnim} from '../../shared/animations'
@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations:[ itemAnim ]
})
export class NotesListComponent implements OnInit {

  notes:Note[] = new Array<Note>();

  constructor(private notesService:NotesService) { }

  ngOnInit(): void {
    this.notes = this.notesService.getAll();
  }

  deleteNote(index:number){
    this.notesService.delete(index);
  }
}
