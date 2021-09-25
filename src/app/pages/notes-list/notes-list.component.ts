import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('filterInput') filterInputElementRef :  ElementRef<HTMLInputElement>;

  constructor(private notesService:NotesService) { }

  ngOnInit(): void {
    this.notes = this.notesService.getAll();
    this.filter('');
  }

  generateNoteURL(note:Note){
    let noteId = this.notesService.getId(note);
    return noteId;
  }

  deleteNote(note:Note){
    let noteId = this.notesService.getId(note);
    this.notesService.delete(noteId);

    this.filter(this.filterInputElementRef.nativeElement.value);
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

    // now sort by relevancy

    this.sortByRelevancy(allResults);
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

  sortByRelevancy(searchResults: Array<Note>){
    //Calculate the relevance of a note based on the number of times it appears in the search result

    let noteCountObject : Object ={};

    searchResults.forEach( note =>{
      let noteId = this.notesService.getId(note);

      if(noteCountObject[noteId]){
        noteCountObject[noteId] += 1;

      }
      else{
        noteCountObject[noteId] = 1;
      }
    })

    this.filteredNotes = this.filteredNotes.sort((a:Note, b:Note)=>{
      let aId = this.notesService.getId(a);
      let bId = this.notesService.getId(b);

      let aCount = noteCountObject[aId];
      let bCount = noteCountObject[bId];

      return bCount - aCount;
    })
  }
}
