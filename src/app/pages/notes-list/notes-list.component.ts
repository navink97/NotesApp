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
  filteredNotes : Note[] = new Array<Note>();

  constructor(private notesService:NotesService) { }

  ngOnInit(): void {
    this.notes = this.notesService.getAll();
    this.filteredNotes = this.notes;
  }

  deleteNote(index:number){
    this.notesService.delete(index);
  }

  filter(query:string){
    let allResults: Array<Note> = new Array<Note>();
    query = query.toLowerCase().trim();

    let words = query.split(' ');
    words = this.removeDuplicates(words);

    words.forEach(word=>{
      let results = this.relevantNotes(word);
      allResults = [...allResults, ... results]  //Merging arrays using deconstruction
    });

    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;
  }

  relevantNotes(query): Array<Note>{
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note =>{
      if(note.title && note.title.toLowerCase().includes(query)){
        return true;
      }
      if(note.body && note.body.toLocaleLowerCase().includes(query)){
        return true;
      }
      
      return false;
      
    })

    return relevantNotes;
  }

  removeDuplicates(words:Array<any>): Array<any>{
    let uniqueResults : Set<any> = new Set<any>(); 
    words.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }
}
